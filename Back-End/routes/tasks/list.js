const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
  //List param
  name: "todo/list",
  execute: async (req, res) => {
    pool.query('SELECT  * FROM tasks', [], (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("tasks...", result.rows);
      res.send(result.rows);
    });
    }
    }
    

