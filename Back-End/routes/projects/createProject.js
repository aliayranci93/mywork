const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "admin/createProject",
  execute: async (req, res) => {
    const { name, key } = req.body;
    let query = "INSERT INTO projects (name,key) VALUES ($1,$2) RETURNING *";
    try {
      const result = await pool.query(query, [name, key]);
      res.json(result.rows);
    } catch (err) {
      console.error(err.name);
    }
  },
};
