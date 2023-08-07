const {pool, Pool} = require('../../utils/connection');

module.exports = {
    name: "todoAdmin/deleteTask",
    execute: async (req, res) => {
      const { id } = req.params;
      pool.query('DELETE FROM tasks WHERE id = $1', [id], (error, results) => {
       if (error) {
          res.status(500).json({ message: 'An error occurred.' });
        }
        console.log("Task deleted..");
        res.json({ message: 'Task deleted successfully.' });
         
      })
    }
}