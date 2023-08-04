const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "admin/updateAccount",
  execute: async (req, res) => {
    const { password, email, role } = req.body;
    // res.json(email);
    //console.log(req.body);
    let queryUpdate = "UPDATE accounts SET password=$1,role=$3 WHERE email=$2";
    pool.query(queryUpdate, [password, email, role]);
    res.status(200).send("user updated successfully");
    //console.log(results);
  },
};
