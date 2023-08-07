const {jwt} = require('../../../server.js');
const {getUser} = require('../../../methods/user.js');

module.exports = {
    name: "user/getData",
    execute: async (req, res) => {
    //? verilen email ile bulma
    // let email = req.body.email;
    // if(!email || email == ''){
    //     res.json({message:"Please give an email to search."});
    //     return;
    // }

    // const user = await getUser(email);
    // res.send(user.rows[0])


    //? giriş yapıldıktan sonra otomatik çekme
    let email = req.headers.auth.split(' ')[0];
    if(email){
        let result = await getUser(email);
        res.json(result.rows[0]);
    }else{
        res.json({message:"Not authorized"});
        return;
    }
    }
}