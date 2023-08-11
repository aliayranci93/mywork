const {pool, Pool} = require('../../../utils/connection.js');
const {getAccountByMail} = require('./getAccountByMail.js');

module.exports = {
    name: "users_routes/user/sendConfirmationCode",
    execute: async (req, res) =>{

        let code = Math.random().toString(36).slice(2, 7);
        let mail = req.body.mail;
        const exist = getAccountByMail(mail);

        if( !exist) 
        {
            res.status(404).json({ error: "No such account for given email." });
            return;
        }
        else { //Inserts confirmation code into the database.
            let creationtime = new Date();
            pool.query( "INSERT INTO forgetpasswordhistory (creationtime, code, mail) VALUES ($1, $2, $3)", 
            [creationtime, code, mail], (error, results) => {
                if( error ) throw error;
                res.status(201).send("Forget password history information added.");
            });
        }


    }
}