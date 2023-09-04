const {pool, Pool} = require('../../utils/connection');

module.exports = {
  name: "commentsAdd",
  execute: async (req, res) => {
    const {task_id ,email, description, time } = req.body;
try {
  const result = await pool.query('INSERT INTO comments (task_id, email, description, time) VALUES ($1, $2, $3, $4) RETURNING *', [task_id, email,description, new Date().toUTCString()]);
  res.json(result.rows[0]);
} catch (err) {
  console.error('database error', err);
  res.status(500).json({ error: 'database error' });
}
}}
