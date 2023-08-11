const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
    name: "about_us/getText",
    execute: async (req, res) =>{

    pool.query( "SELECT * FROM about_us WHERE id = 1", (error, results) => {
            if( error ) throw error;
            res.status(200).json(results.rows);
        });


    }
}