const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "admin/updateAccount",
  execute: async (req, res) => {
    let query = "UPDATE accounts SET ";
    let updateaccount = [];
    let amount = 0;

    if (req.body.password != undefined) {
      amount++;
      query += "password=$" + amount + ",";
      updateaccount.push(req.body.password);
    }

    if (req.body.email != undefined) {
      amount++;
      query += "email=$" + amount + ",";
      updateaccount.push(req.body.email);
    }

    if (req.body.role != undefined) {
      amount++;
      query += "role=$" + amount + ",";
      updateaccount.push(req.body.role);
    }

    query = query.substring(0, query.toString().length - 1);

    updateaccount.push(req.body.id);
    amount++;
    query += " WHERE id=$" + amount;
    console.log(query);

    pool.query(query, updateaccount, (err, results) => {
      if (err) {
        console.log(err.message);
      }
      res.status(200).json(results.rows);
    });
  },
};
