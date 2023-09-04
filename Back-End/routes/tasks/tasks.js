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
    res.send(result.rows);
  });
  }
  }
