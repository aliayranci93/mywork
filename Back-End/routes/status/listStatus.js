const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "admin/listStatus",
  execute: async (req, res) => {
    pool.query("SELECT * FROM status", (err, results) => {
      if (err) throw err;
      //res.status(200).json(results.rows);
      res.send(results.rows);
    });
  },
};
