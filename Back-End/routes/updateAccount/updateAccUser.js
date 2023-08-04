const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "user/updateAccount",
  execute: async (req, res) => {
    let email = req.headers.auth.split(" ")[0];
    let { password } = req.body;
    try {
      const query = "UPDATE accounts SET password=$1 WHERE email=$2";
      await pool.query(query, [password, email]);
      res.json({ message: "accounts updated" });
    } catch (err) {
      res.status(500).json({ error: "there is a error" });
    }
  },
};
