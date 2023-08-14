const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "admin/updateStatus",
  execute: async (req, res) => {
    const { id, name } = req.body;
    let updated_by = res.locals.accountID;
    try {
      const updateStatus = await pool.query(
        "UPDATE status SET name=$1,updated_at=$2,updated_by=$3 WHERE id=$4",
        [name, new Date().toUTCString(), updated_by, id]
      );
      res.json({ message: "status updated" });
    } catch (error) {
      console.error(error.message);
      //res.status(404).json({ error: "something went wrong!!" });
    }
  },
};
