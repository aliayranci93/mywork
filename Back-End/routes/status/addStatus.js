const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "admin/addStatus",
  execute: async (req, res) => {
    const { name } = req.body;
    let query =
      "INSERT INTO status (name,created_at,updated_at) VALUES ($1,$2,$3,$4)";
    console.log("here");
    pool.query(
      query,
      [name, new Date().toUTCString(), new Date().toUTCString()],
      (err, results) => {
        if (err) {
          console.log(err);
          console.log("this status has already exist");
        }
        res.status(201).send("status added successfully");
      }
    );
  },
};

//column name has UNIQUE quality.
//opended resolved reopened in progress
//update edeni nasıl tutucaz
