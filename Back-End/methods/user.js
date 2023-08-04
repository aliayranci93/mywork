//Database
const {pool, Pool} = require('../utils/connection.js');

//! Burdaki fonksiyonlar tekli olarak export ediliyor. Kullanılmayacak dosyada hepsi barınmıyor.

exports.getUser = (email) =>{
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = $1';
        pool.query(query, [email], (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
    });
}

exports.updateUser = (user, data) =>{
    user = user.rows[0];
    
    let email = user.email;
    let name = user.name == data.name || data.name == '' ? user.name : data.name;
    let phone= user.phone == data.phone || data.phone == '' ? user.phone : data.phone;
    let job = user.job == data.job || data.job == '' ? user.job : data.job;
    
    return new Promise((resolve, reject) => {
        let query = "UPDATE users SET name=$1, phone=$2, job=$3 WHERE email=$4";
        pool.query(query, [name, phone, job, email], (err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve();
        })
    })
}

exports.deleteUser = (email) => {
    return new Promise((resolve, reject) => {
      //users tablosundan silme
        pool.query('DELETE FROM users WHERE email=$1', [email], (err) => {
          if (err) {
            reject(err);
          }
        });
        //accounts tablosundan silme
        pool.query('DELETE FROM tokens WHERE email=$1', [email], (err)=>{
          if(err){
              reject(err);
          }
          
        })
        //tokens tablosundan silme
        pool.query('DELETE FROM accounts WHERE email=$1', [email], (err)=>{
          if(err){
              reject(err);
          }
          
        })
        resolve();
      });
}

exports.getAllUser = (req, res) => {
    return new Promise((resolve, reject)=>{
        let query = "SELECT * FROM accounts"
        pool.query(query, [], (err, result)=>{
            if(err){
                console.log(err);
                res.json({code: -1})
                return;
            }
            res.send(result.rows);
        })
    })
}


exports.getUsersEmails = () => {
    return new Promise((resolve, reject) => {
      let emails = [];
      pool.query("SELECT email FROM accounts", [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          result.rows.forEach(element => {
            emails.push(element["email"]);
          });
          resolve(emails);
        }
      });
    });
}

//silinecek delete acoounts kısmı
