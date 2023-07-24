const express = require('express')
const {pool, Pool} = require('../../utils/connection.js');

const app =express()
app.use(express.json())


const PORT= 3000

exports.contact = (req, res) => {
     
      pool.query('SELECT * FROM contactus', [], (err, result) =>{
        if(err){
            console.log(err)
            return;
        }
        console.log("conectted database...",result.rows)
        res.send(result.rows);
    })
  };

  exports.contact_email = (req, res) => {
    return new Promise((resolve, reject) => {
      let emails = [];
      pool.query("SELECT email FROM contactus", [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          result.rows.forEach((element) => {
            console.log("conectted ...", result.rows);
            res.json(result.rows)
            emails.push(element["email"]);
          });
          resolve(emails);
        }
      });
    });
  };


exports.contact_delete = (req, res) => {
   // const contactID = req.params.id; 
 //   res.send("kullainici ID'si ${contactID} olan kullanici silindi.");

const id = 3; 
pool.query('DELETE FROM contactus WHERE id = $1', [id], (err, result) => {
  if (err) {
    console.error('error delete:', err);
  } else {
    console.log('users deleted');
    //res.send("users deleted");
  }
});
};

// exports.contact_update_email = (user) =>{
//   user = user.rows[0];
  
//   let email = user.email;
  
//   return new Promise((resolve, reject) => {
//       let query = "UPDATE email FROM contactus";
//       pool.query(query, [name, phone, job, email], (err)=>{
//           if(err){
//               reject(err);
//               return;
//           }
//           resolve();
//       })
//   })
// }

exports.contact_update_email = (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

 
  User.findId(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred while finding the user' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.email = updatedUserData.email;

    user.save((err) => {
      if (err) {
        return res.status(500).json({ error: 'An error occurred while updating the user' });
      }

      res.json({ message: 'User updated successfully' });
    });
  });
};
