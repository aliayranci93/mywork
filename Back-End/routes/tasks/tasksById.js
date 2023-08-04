const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
  name: "todo",
  execute: async (req, res) => {
   //todo list all by ıd   
   const { id } = req.params;
   pool.query("SELECT * FROM tasks WHERE id = $1", [id], (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("conectted task...", result.rows);
      res.send(result.rows);
    });
}}