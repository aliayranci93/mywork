const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "admin/listProjects",
  execute: async (req, res) => {
    pool.query("SELECT * FROM projects", (err, results) => {
      if (err) throw err;
      //res.status(200).json(results.rows);
      res.send(results.rows);
    });
  },
};
