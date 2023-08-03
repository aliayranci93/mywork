const {pool, Pool} = require('../../utils/connection');

module.exports = {
  name: "comment",
  execute: async (req, res) => {
    pool.query('SELECT * FROM comments', [], (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("conectted tasks...", result.rows);
      res.send(result.rows);
    });
  
  }}