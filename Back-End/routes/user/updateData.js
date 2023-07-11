const { jwt, jwtSecret } = require("../../server.js");
const {getUser, updateUser} = require('../../methods/user.js');

//? tokenden email kontrol ediyorum ama sanki gereksiz gibi?? (kullanıcı kendi verisini güncelliyor)

module.exports = {
  name: "user/updateData",
  execute: async (req, res) => {
    let email = req.body.email == "" ? undefined : req.body.email;
    let token = req.cookies.jwt;

    //jwt verify getData.js'de bulunuyor fakat işlevleri farklı
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.json(err);
        return;
      }
      if (decodedToken.email != email) {
        return;
      }
    });

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
