const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
    name: "contact/contactSend",
    execute: async (req, res) =>{

        const { name, email, phonenumber, message } = req.body;
        if( name == "" || phonenumber == "" || message == "") //name, phonenumber and message must be entered.
        {
            res.send("Please enter the mandatory fields");
            
        }
        else { //Inserts into the database
            pool.query( "INSERT INTO contactpeople (name, email, phonenumber, message) VALUES ($1, $2, $3, $4)", 
            [name, email, phonenumber, message], (error, results) => {
                if( error ) throw error;
                res.status(201).send("Message and contact information added");
            });
        }


    }
}