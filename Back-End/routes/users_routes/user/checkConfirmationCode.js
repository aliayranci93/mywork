const {pool, Pool} = require('../../../utils/connection.js');
const {getAccountByMail} = require('../user/getAccountByMail.js');

module.exports = {
    name: "users_routes/user/checkConfirmationCode",
    execute: async (req, res) =>{

        let sqlString = "SELECT * FROM forgetpasswordhistory WHERE mail = $1 ORDER BY creationtime DESC LIMIT 1";

        pool.query(sqlString, [req.body.mail] ,(error, results) => {
            if(error) throw error;
            let dbCode = results.rows[0].code;
            if( dbCode != req.body.code)
            {
                res.status(404).send( "Code entered is wrong." );
                return;
            }
            else
            {
                let str = "UPDATE accounts SET password = $1 WHERE email = $2";
                pool.query( str, [req.body.password, req.body.mail], (error, results) => {
                    if( error ) throw error;
                    res.status(201).send("Password is changed.");
                });
            }
    
        })
        


    }
}