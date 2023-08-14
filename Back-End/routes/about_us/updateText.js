const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
    name: "about_us/updateText",
    execute: async (req, res) =>{

    pool.query( "UPDATE about_us SET text = $1 WHERE id = 1", [req.body.text] ,(error, results) => {
            if( error ) throw error;
            res.status(200).send("Text is updated");
        });


    }
}