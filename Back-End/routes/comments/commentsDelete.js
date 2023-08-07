const {pool, Pool} = require('../../utils/connection');

module.exports = {
    name: "commenetDelete",
    execute: async (req, res) => {
      const { id } = req.params;
      pool.query('DELETE FROM comments WHERE id = $1 ', [id], (error, results) => {
        if (error) {
          res.status(500).json({ message: 'An error occurred.' });
        }
        console.log('Comment deleted..');
        console.log(id);
        res.json({ message: 'Comments deleted successfully.' });
         
      })
    }
}