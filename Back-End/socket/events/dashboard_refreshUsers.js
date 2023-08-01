const { pool, Pool } = require("../../utils/connection.js")

module.exports = {
    name:"dashboard/refreshUsers",
    execute: (ws, data) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users', [], (err, results) => {
                if(err){
                    console.log(err);
                    reject(err);
                }
                resolve(JSON.stringify({name:"refresh/usersTable", data: results.rows}));
            })
        })
    }
}