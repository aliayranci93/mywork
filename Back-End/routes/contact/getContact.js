const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
    name: "contact/getContact",
    execute: async (req, res) => {
        pool.query("SELECT phone, fax, email FROM settings", (error, results) => {
            if(error) throw error;
            res.status(200).json(results.rows);
    
        })



    }
}