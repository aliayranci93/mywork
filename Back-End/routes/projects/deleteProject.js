const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "admin/deleteProject",
  execute: async (req, res) => {
    const { project_id } = req.body;
    let query = "DELETE FROM projects WHERE id = $1";

    try {
      const deletedProjects = await pool.query(query, [project_id]);
      res.json({ message: "project deleted successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(401).json({ error: "there is a error" });
    }
  },
};

//taskta da silmek için db de DELETE CASCADE vermek lazım
