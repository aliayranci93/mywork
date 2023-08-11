const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
    name: "mainMenu/taskSearch",
    execute: async (req, res) =>{

        let  enteredStr = req.body.searched;
        let sqlString = "SELECT t.* FROM tasks t INNER JOIN projects p ON t.project_id = p.id WHERE (t.title LIKE '%' || $1 || '%' OR t.description LIKE '%' || $2 || '%' OR p.name LIKE '%' || $3 || '%')";

        pool.query(sqlString, [enteredStr, enteredStr, enteredStr], (error, results) => {
            if(error) throw error;
            res.status(200).json(results.rows);
    
        })
        


    }
}