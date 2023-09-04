const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "user/listPriorities",
  execute: async (req, res) => {
    pool.query("SELECT * FROM priorities", (err, results) => {
      if (err) throw err;
      res.send(results.rows);
    });
  },
};
