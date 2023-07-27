const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
  name: "todo",
  execute: async (req, res) => {
   //todo list all
  pool.query("SELECT * FROM todo", [], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("conectted tasks...", result.rows);
    res.send(result.rows);
  });
  }
  }
// todo create 
// exports.createTasks= (req, res) => {
//   const { priority, title, description, status, assignee } = req.body;

//   pool.query('INSERT INTO todo (priority,  description, status, assignee) VALUES ($1, $2, $3, $4, $5)', [priority,title,description, status, assignee])
//     .then(() => {
//       console.log("Task created successfully")
//       res.status(201).json({ message: 'Task created successfully.' });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ message: 'An error occurred.' });
//     });
// };

