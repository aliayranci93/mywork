const fs = require('fs');
const xml2js = require('xml2js')
const he = require('he')
const {isProjectExist, createProject, insertData} = require('../../methods/entegrationMethods.js');

//todo id'ler eşsiz gelecek tabloyu ona göre değiştir. xmlden okurken idleri al

module.exports = {
    name:"JIRA-ENT",
    execute: async (req, res) => {
        let dataArray = [];
        //ÖZEL GÖREV
        let file = fs.readFileSync('./file.xml', 'utf-8');


        const parser = new xml2js.Parser({
            attrkey: 'attributes', // This sets the key for attributes in the resulting JSON
            charkey: 'value', // This sets the key for the tag values in the resulting JSON
            explicitArray: false, // This prevents arrays from being created for single elements
          });
          
          parser.parseString(he.decode(file), (err, result) => {
            if (err) {
              console.error('Error parsing XML:', err);
            } else {
              // Now you can access the parsed JSON
              file = result;
            }})
        if(Array.isArray(file.rss.channel.item)){
            file.rss.channel.item.forEach(element => {
                let data = {
                    id: element.key.attributes.id,
                    title: element.title,
                    project: element.project.value,
                    key: element.key.value,
                    summary: element.summary,
                    priority: element.priority.value,
                    status: element.status.value,
                    assignee: element.assignee.value,
                    createdAt: element.created,
                    updatedAt: element.updated
                }
                dataArray.push(data);
            });
        }else{
            let item = file.rss.channel.item;
            let data = {
                id: item.key.attributes.id,
                title: item.title,
                project: item.project.value,
                projectID: item.project.attributes.id,
                key: item.key.value,
                summary: item.summary,
                priority: item.priority.value,
                status: item.status.value,
                assignee: item.assignee.value,
                createdAt: item.created,
                updatedAt: item.updated
            }
            dataArray.push(data);
        }

        dataArray.forEach(async element => {
            if(!(await isProjectExist(element.projectID))){
                await createProject(element.projectID, element.project);
            }
            await insertData(element);
            res.json({message: "Your data has been stored successfully.", titles: dataArray.map(element => element.title)})
        });
    }
}