const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "user/updateAccount",
  execute: async (req, res) => {
    let user_id = res.locals.accountID;
    let query1 = "UPDATE accounts SET ";
    let query2 = "WHERE id=$1";
    let data = req.body;
    let updateaccount = "";
    let checkRole = await pool.query("select role from accounts where id=$1", [
      user_id,
    ]);

    for (let key in data) {
      if ((key == "role") & (checkRole.rows[0].role == "Basic")) {
        continue;
      }
      if (key == "id") {
        continue;
      } else {
        updateaccount += `${key} = '${data[key]}',`;
      }
    }
    if (updateaccount.substring(updateaccount.length - 1) == ",") {
      updateaccount = updateaccount.trim().slice(0, -1);
    } else {
      res.json("there is a sql error");
    }
    let query = `${query1} ${updateaccount} ${query2}`;

    if (checkRole.rows[0].role == "Basic") {
      pool.query(query, [user_id], (err, results) => {
        if (err) {
          console.log(err.message);
        }
        res.status(200).send("update account successfully!");
      });
    } else {
      pool.query(query, [req.body.id], (err, results) => {
        if (err) {
          console.log(err.message);
        }
        res.status(200).send("update account successfully!");
      });
    }
  },
};
