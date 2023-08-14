const { jwt} = require("../../../server.js");
const {getUser, updateUser} = require('../../../methods/user.js');

//Database
const {pool, Pool} = require('../../../utils/connection.js')

//? tokenden email kontrol ediyorum ama sanki gereksiz gibi?? (kullanıcı kendi verisini güncelliyor)

module.exports = {
  name: "user/updateData",
  execute: async (req, res) => {
    let id = res.locals.accountID; //id sessionStorage üzerinden geliyor
    if (!id) {
      res.json({
        message: "Give an id adress to update user data.",
      });
      return;
    }
    
    let parameters = {
      name: req.body.name,
      phone: req.body.phone,
      job: req.body.job,
    };

    try {
      const user = await getUser(id); // kullanıcı kontrolü (zaten kişi kendi profilinden bakıyor kaldırılabilir)
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
