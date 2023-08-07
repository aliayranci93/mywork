const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
  name: "change/status",
  execute: async (req, res) => {
        const {id} =req.params;
        const {status_id, updated_at } = req.body;
        try {
        const result = await pool.query('UPDATE tasks SET status_id= $1, updated_at=$2  WHERE id = $3' , [status_id, new Date().toUTCString(), id]);
        console.log("Change status successfully");
        res.status(202).json({ message: 'change status..' });
        
        } catch (err) {
          console.error('database error', err);
          res.status(500).json({ error: 'database error' });
        }
      }
    }