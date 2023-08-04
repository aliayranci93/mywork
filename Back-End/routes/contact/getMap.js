const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
    name: "contact/getMap",
    execute: async (req, res) => {
        pool.query("SELECT map FROM settings", (error, results) => {
            if(error) throw error;
            res.status(200).json(results.rows);
    
        })



    }
}