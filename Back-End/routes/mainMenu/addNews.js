const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
    name: "mainMenu/addNews",
    execute: async (req, res) =>{
        let title = req.body.title;
        let author = req.body.author;
        let description = req.body.description;
        let image = req.body.image;
        let categoryid = req.body.categoryid;
        let tag = req.body.tag;
        let creationtime = new Date();

        if( title == '' || author == '') //name, phonenumber and message must be entered.
        {
            res.send("Please enter the mandatory fields");
            
        }
        else { //Inserts into the database
            pool.query( "INSERT INTO news (title, creationtime, author, description, image, categoryid, tag) VALUES ($1, $2, $3, $4, $5, $6, $7)", 
            [title, creationtime, author, description, image, categoryid, tag], (error, results) => {
                if( error ) throw error;
                res.status(201).send("News added");
            });
        }
        


    }
}