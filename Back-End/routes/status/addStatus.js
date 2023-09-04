const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "admin/addStatus",
  execute: async (req, res) => {
    const { name } = req.body;
    let updated_by = res.locals.accountID;
    try {
      let addStatus = await pool.query(
        "INSERT INTO status (name,created_at,updated_at,updated_by) VALUES ($1,$2,$3,$4)",
        [name, new Date().toUTCString(), new Date().toUTCString(), updated_by]
      );
      //res.json(addStatus.rows);
      res.status(201).send("status added successfully");
    } catch (error) {
      console.log(error.message);
      console.log("this status has already existed");
    }
  },
};
