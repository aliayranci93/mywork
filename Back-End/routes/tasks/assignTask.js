const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
  //Assign  Task
  name: "todo/assign",
  execute: async (req, res) => {
    const {id} =req.params;
    const {assignee_acc_id, updated_at } = req.body;
  try {
    const result = await pool.query('UPDATE tasks SET assignee_acc_id=$1 , updated_at=$2  WHERE id = $3 ' , [assignee_acc_id, new Date().toUTCString(), id]);
        if (result.rows.length === 0) {
      console.log("Change assignee successfully");
      return res.status(202).json( { message: 'change assignee succesfully..' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('database error:', err);
    res.status(500).json({ error: 'database error' });
  }
  }}

