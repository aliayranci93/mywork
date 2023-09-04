const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
  name: "todo/id",
  execute: async (req, res) => {
   //todo list all by ıd   
   const { id } = req.params;
   pool.query("SELECT * FROM tasks WHERE id = $1", [id], (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(result.rows);
    });
}}