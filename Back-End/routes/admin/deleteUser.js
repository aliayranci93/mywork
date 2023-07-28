const {getUser, deleteUser} = require('../../methods/user.js');

module.exports = {
    name:"admin/deleteUser",
    execute: async (req, res) => {
        let email = req.body.email;
    try {
      //id ile kontrol database hata vermiyor
      // const user = await getUser(email);
      // if (!user) {
      //   res.status(404).json({ error: 'No such data for given email' });
      //   return;
      // }
  
      await deleteUser(email);
      //delete account kısmı sorun çıkarıyor yazıyorum
      

      res.json({ message: 'User deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
    }
}