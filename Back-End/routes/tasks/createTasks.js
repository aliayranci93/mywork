const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
    // User create tasks 
  name: "todo/createTask",
  execute: async (req, res) => {
    const { priority, title, description, status, assignee, created_at,  key, project } = req.body;
    try {
        const result = await pool.query('INSERT INTO todo (priority, title, description, status, assignee, created_at, key, project) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 )', [priority,title,description, status, assignee, new Date().toUTCString(),  key, project])
        console.log("Task created successfully", result.rows);
        res.send(result.rows);
// res.json(result.rows[0]);
    } catch (err) {
      console.error('database error', err);
      res.status(500).json({ error: 'database error' });
    }
  }
}