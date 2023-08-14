const {pool, Pool} = require('../../../utils/connection.js');

exports.getAccountByMail = (email) =>{
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM accounts WHERE email = $1';
        pool.query(query, [email], (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          if( result.rows.length == 0)
          {
            return false;
          }
          else
          {
            return true;
          }
        });
    });
    /* pool.query("SELECT * FROM accounts WHERE email = $1", [email] ,(error, results) => {
      if(error) throw error;
      if( results.rows.length == 0)
      {
        return false;
      }
      else
      {
        return true;
      }

  }) */
}