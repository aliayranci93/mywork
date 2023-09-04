const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "user/getPriorities",
  execute: async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("SELECT * FROM priorities where id=$1", [id], (err, results) => {
      if (err) throw err;
      res.status(200).json(results.rows);
    });
  },
};
