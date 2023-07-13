const { Pool, pool, jwt } = require("../../server.js");
const {generateToken } = require("../../auth.js");
const {encode64, decode64} = require('../../methods/token.js')
const crypto = require('crypto')

module.exports = {
  name: "login",
  execute: (req, res) => {
    //Basic auth denemesi
    const params = req.headers.authorization.split(' ')[1];
    let buff = new Buffer.from(params, 'base64');
    let mail_password = buff.toString('ascii').split(':');
    let email = mail_password[0];
    let password = mail_password[1]; 
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
              const token = jwt.sign({email: email, role: result.role}, key, {expiresIn: '30s'}) // default encoding hs256

              pool.query('UPDATE tokens SET key=$1 WHERE email=$2', [key, email], (err)=>{
                if(err){
                    console.log(err);
                    return;
                }
              })
              result["login"] = true;
              res.send({token: token});
            } else {
              let respond = { login: false };
              res.send(respond);
            }
          }
        }
      );
  },
};
