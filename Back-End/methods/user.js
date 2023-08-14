//Database
const {pool, Pool} = require('../utils/connection.js');

//! Burdaki fonksiyonlar tekli olarak export ediliyor. Kullanılmayacak dosyada hepsi barınmıyor.


exports.getUser = (id) =>{
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM accounts WHERE id = $1';
        pool.query(query, [id], (err, result) => {
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
    
    let id = user.id;
    // let email = user.email; email değiştirmiyorum
    let name = user.name == data.name || data.name == '' ? user.name : data.name;
    let phone= user.phone == data.phone || data.phone == '' ? user.phone : data.phone;
    let job = user.job == data.job || data.job == '' ? user.job : data.job;
    
    return new Promise((resolve, reject) => {
        let query = "UPDATE accounts SET name=$1, phone=$2, job=$3 WHERE id=$4";
        pool.query(query, [name, phone, job, id], (err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve();
        })
    })
}

exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {

        //tokens tablosundan silme (foreign key var)
        pool.query('DELETE FROM tokens WHERE account_id=$1', [id], (err)=>{
          if(err){
            console.log(err)
              reject(err);
          }
          pool.query('DELETE FROM accounts WHERE id=$1', [id], (err)=>{
            if(err){
              console.log(err)
                reject(err);
            }
            
          })
        })
        //accounts tablosundan silme
        
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
