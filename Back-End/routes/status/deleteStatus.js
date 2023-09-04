const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "admin/deleteStatus",
  execute: async (req, res) => {
    const { status_id } = req.body;
    let query =
      "delete from status where id=$1 and not exists(select * from tasks where status_id=status.id)";
    let result = await pool.query(query, [status_id]);
    if (!result.rowCount) {
      console.log(result.rowCount);
      res.json({ message: "this status is used by users" });
    } else {
      res.json({ message: "status removed successfully" });
    }
  },
};
