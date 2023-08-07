const { pool, Pool } = require("../../utils/connection.js");

module.exports = {
  name: "admin/addStatus",
  execute: async (req, res) => {
    const { name, updated_by } = req.body;
    //const { updated_by } =;
    let query =
      "INSERT INTO status (name,created_at,updated_at,updated_by) VALUES ($1,$2,$3,$4)";
    pool.query(
      query,
      [name, new Date().toUTCString(), new Date().toUTCString(), updated_by],
      (err, results) => {
        if (err) {
          console.log(err);
          console.log("this status has already existed");
        }
        res.status(201).send("status added successfully");
      }
    );
  },
};
