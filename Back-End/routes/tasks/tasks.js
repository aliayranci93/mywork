const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
  name: "todo",
  execute: async (req, res) => {
   //todo list all
  pool.query("SELECT * FROM todo", [], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    //console.log("conectted tasks...", result.rows); server her başladığında konsola düşüyor ?
    res.send(result.rows);
  });
  }
  }
