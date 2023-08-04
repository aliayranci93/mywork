const {pool, Pool} = require('../../utils/connection.js');

module.exports = {
  name: "commentUpdate",
  execute: async (req, res) => {
    const {id} =req.params;
    const {description, email, time, } = req.body;
  try {
    const result = await pool.query('UPDATE comments SET email=$1, description=$2, time=$3 WHERE id = $4 ' , [email, description, new Date().toUTCString(), id]);
        if (result.rows.length === 0) {
      return res.status(202).json( 'comment updated.' );
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('database error:', err);
    res.status(500).json({ error: 'database error' });
  }
}
}