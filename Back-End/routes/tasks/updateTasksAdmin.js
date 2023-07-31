const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
  // Admin update tasks 
  name: "todoAdmin/updateTask",
  execute: async (req, res) => {
    const {id} =req.params;
    const {priority, title, description, status, assignee, updated_at, key, project} = req.body;
  try {
    const result = await pool.query('UPDATE todo SET  priority=$1, title=$2, description=$3, status=$4, assignee=$5, updated_at=$6, key=$7, project=$8 WHERE id = $9 ' , [priority,title,description, status, assignee, new Date().toUTCString(), key, project, id]);
        if (result.rows.length === 0) {
      return res.status(404).json({ message: 'task updated.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('database error:', err);
    res.status(500).json({ error: 'database error' });
  }
}
}