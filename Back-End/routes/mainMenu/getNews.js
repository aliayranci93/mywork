const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
    name: "mainMenu/getNews",
    execute: async (req, res) =>{

        let sqlString = "SELECT * FROM news ORDER BY creationtime DESC LIMIT $1" ;

        pool.query(sqlString, [req.body.amount], (error, results) => {
            if(error) throw error;
            res.status(200).json(results.rows);
    
        })
        


    }
}