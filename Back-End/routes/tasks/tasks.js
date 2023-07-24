const express = require("express");
const { pool, Pool } = require("../connection.js");

const app = express();
app.use(express.json());

const PORT = 3000;

exports.tasks = (req, res) => {
  pool.query("SELECT * FROM tasks", [], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("conectted tasks...", result.rows);
    res.send(result.rows);
  });
};


exports.tasksById =(req, res) => {
  console.log("req.body", req.body);
  const { id } = req.params;
  pool.query("SELECT * FROM tasks WHERE id = $1", [id], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("conectted tasks...", result.rows);
    res.send(result.rows);
  });
};


 
  
