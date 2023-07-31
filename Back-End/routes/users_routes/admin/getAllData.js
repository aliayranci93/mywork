const {getAllUser} = require('../../../methods/user.js');

module.exports = {
    name: "admin/getAllData",
    execute: async (req, res) => {
        await getAllUser(req, res);
    }
}