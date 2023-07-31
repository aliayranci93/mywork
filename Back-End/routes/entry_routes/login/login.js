const { jwt } = require("../../../server.js");
const {encode64} = require('../../../methods/token.js')
const crypto = require('crypto')
const {pool, Pool} = require('../../../utils/connection.js');

module.exports = {
  name: "login",
  execute: (req, res) => {
    //Basic auth denemesi
    const params = req.headers.authorization.split(' ')[1];
    let buff = new Buffer.from(params, 'base64');
    let mail_password = buff.toString('ascii').split(':');
    let email = mail_password[0];
    let password = mail_password[1];
    // API RESPONSE
    if(email == '' || password == ''){
      res.json({message:"Fill all fields!", code: 0})
      return;
    }
    //email validation
    // let pattern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    // if(!pattern.test(email)){
    //   res.json({message:"Please write a valid email!", code:0})
    //   return;
    // }

    pool.query(
        "SELECT * FROM accounts WHERE email=$1",
        [`${email}`],
        function (err, result) {
          if (err) {
            console.log(err);
            return;
          } else {
            result = result.rows[0]; // ilk objeyi alsın zaten unique email
            if (!result) {
              res.json({
                message: "No such account!",
                code: 0
              });
              return;
            }
            if (password == result.password) {
              //key oluşturma (ikisi de çalışıyor)
              //sha256
              const key = crypto.createHash('sha256').update(`${Date.now()}:${email}`, 'utf-8').digest('hex');

              //base64
              // const key = encode64(`${Date.now()}:${email}`);

              //token oluşturma
              const accessToken = jwt.sign({email: email, role: result.role}, key, {expiresIn: '15m'}) // default encoding hs256 expiresIn kısmı sabit 30sn 
              const refreshToken = jwt.sign({email: email}, key, {expiresIn: '1d'})

              pool.query('UPDATE tokens SET key=$1, refresh_token=$2 WHERE email=$3', [key, refreshToken, email], (err)=>{
                if(err){
                    console.log(err);
                    return;
                }
              })
              res.json({token: accessToken, message:"Login Successful!", code: 1})
            } else {
              let respond = { message: "Login Failed!", code: 0 };
              res.send(respond);
            }
          }
        }
      );
  },
};
