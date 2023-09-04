const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "admin/updateProject",
  execute: async (req, res) => {
    let query = "UPDATE projects SET ";
    let updateProject = [];
    let amount = 0;
    if (req.body.name != undefined) {
      amount++;
      query += "name=$" + amount + ",";
      updateProject.push(req.body.name);
    }

    if (req.body.key != undefined) {
      amount++;
      query += "key=$" + amount + ",";
      updateProject.push(req.body.key);
    }

    query = query.substring(0, query.toString().length - 1);

    updateProject.push(req.body.id);
    amount++;
    query += " WHERE id=$" + amount;
    console.log(query);
    console.log(updateProject);

    pool.query(query, updateProject, (err, results) => {
      if (err) {
        console.log(err.message);
      }
      res.status(200).json(results.rows);
    });
  },
};
