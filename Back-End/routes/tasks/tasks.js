const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
  name: "todo",
  execute: async (req, res) => {
   //todo list all
   pool.query('SELECT * FROM tasks', [], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("conectted tasks...", result.rows);
    res.send(result.rows);
  });
  }
  }
