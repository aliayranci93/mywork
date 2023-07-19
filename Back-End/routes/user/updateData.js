const { jwt} = require("../../server.js");
const {getUser, updateUser} = require('../../methods/user.js');

//Database
const {pool, Pool} = require('../../utils/connection.js')

//? tokenden email kontrol ediyorum ama sanki gereksiz gibi?? (kullanıcı kendi verisini güncelliyor)

module.exports = {
  name: "user/updateData",
  execute: async (req, res) => {
    //bu kontrol boşa yazıldı
    let email = req.headers.auth.split(' ')[0];
    // let token = req.headers.auth.split(' ')[1];

    // pool.query('SELECT key FROM tokens WHERE email=$1', [email], (err, result) =>{
    //   let key = result.rows[0].key;
      
    //   jwt.verify(token, key, (err, decodedURL) => {
    //     if(err){
    //       console.log(err);
    //       return;
    //     }

    //     if(decodedURL.email != email){
    //       res.json({message: "This is not your email!"})
    //     }

    //   })

    // })
    if (!email) {
      res.json({
        message: "Give an email adress to update user data.",
      });
      return;
    }

    let parameters = {
      name: req.body.name,
      phone: req.body.phone,
      job: req.body.job,
    };

    try {
      const user = await getUser(email);
      if (!user) {
        res.status(404).json({ error: "No such data for given username." });
        return;
      }

      await updateUser(user, parameters);
      res.json({ message: "User's username has been changed." });
    } catch (error) {
      console.log(error);
    }
  },
};
