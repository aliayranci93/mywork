const {pool, Pool} = require('../../utils/connection');

module.exports = {
    name: "commenetDelete",
    execute: async (req, res) => {
      const { comment_id } = req.params;
      pool.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *', [comment_id], (error, results) => {
        if (error) {
          res.status(500).json({ message: 'An error occurred.' });
        }
        console.log('Comment deleted..');
        console.log(comment_id);
        res.json({ message: 'Comments deleted successfully.' });
         
      })
    }
}