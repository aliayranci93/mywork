const {getUser, deleteUser} = require('../../../methods/user.js');

module.exports = {
    name:"admin/deleteUser",
    execute: async (req, res) => {
        let id = req.body.id;
    try {
      //id ile kontrol database hata vermiyor
      // const user = await getUser(id);
      // if (!user) {
      //   res.status(404).json({ error: 'No such data for given id' });
      //   return;
      // }
  
      await deleteUser(id);
      

      res.send({ message: 'User deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
    }
}