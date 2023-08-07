const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
  // Admin update tasks 
  name: "todoAdmin/updateTask",
  execute: async (req, res) => {
    const {id} =req.params;
    const {title, description, updated_at, priority_id, status_id, assignee_acc_id, project_id} = req.body;
  try {
    const result = await pool.query('UPDATE tasks SET title=$1, description=$2, updated_at=$3, priority_id=$4,status_id=$5, assignee_acc_id=$6, project_id=$7 WHERE id = $8 ' , [title,description, new Date().toUTCString(), priority_id, status_id, assignee_acc_id, project_id, id]);
        if (result.rows.length === 0) {
      console.log("Task updated successfully");
      return res.status(202).json({ message: 'task updated successfully..' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('database error:', err);
    res.status(500).json({ error: 'database error' });
  }
}
}