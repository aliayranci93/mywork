const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "admin/createProject",
  execute: async (req, res) => {
    const { id, name, key } = req.body;
    let query =
      "INSERT INTO projects (id,name,key) VALUES ($1,$2,$3) RETURNING *";
    try {
      const result = await pool.query(query, [id, name, key]);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
    }
  },
};
