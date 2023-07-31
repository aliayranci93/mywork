const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
  name: "todo/change/status",
  execute: async (req, res) => {
        const { id , status } = req.body;
        try {
        const result = await pool.query('UPDATE todo SET status = $1 WHERE id = $2' , [status, id], (err, result));
        console.log("Change status successfully", result.rows);
          res.json(result.rows[0]);

        } catch (err) {
          //console.error('database error', err);
          res.status(500).json({ error: 'database error' });
        }
      }
    }