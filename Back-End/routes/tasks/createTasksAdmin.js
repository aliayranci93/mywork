const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
  // Adim create tasks 
  name: "todoAdmin/createTask",
  execute: async (req, res) => {
    const { title, description, created_at, priority_id, status_id, assignee_acc_id ,project_id } = req.body;
    try {
        const result = await pool.query('INSERT INTO tasks (title, description, created_at, priority_id, status_id, assignee_acc_id ,project_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', [title,description, new Date().toUTCString(), priority_id, status_id, assignee_acc_id, project_id])
        console.log("Task created successfully", result.rows);
        return res.status(202).json({ message: 'Admin create task successfully ..' });
        res.send(result.rows[0]);
// res.json(result.rows[0]);
    } catch (err) {
      console.error('database error', err);
      res.status(500).json({ error: 'database error' });
    }
  }
}