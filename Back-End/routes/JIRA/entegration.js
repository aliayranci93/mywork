const {XMLParser} = require('fast-xml-parser');
const fs = require('fs');
const parser = new XMLParser();
const he = require('he')


module.exports = {
    name:"JIRA-ENT",
    execute: async (req, res) => {
    //ÖZEL GÖREV
    let file = fs.readFileSync('./file.xml', 'utf-8');
    file = parser.parse(he.decode(file));
    file.item.forEach(element => {
        console.log()
    });
    
    }
}