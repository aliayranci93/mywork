const jwt = require("jsonwebtoken");

const expireDuration = 1 *1000 //Change the first number (in seconds)

//Database connection
const {postgrepass} = require('./config.json');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mywork',
  password: postgrepass,
  port: 5432,
})


exports.adminAuth = (req, res, next) => {
  let auth = req.headers.auth;
  auth = auth.split(' ');
  let email = auth[0] == '' ? undefined: auth[0];
  let token = auth[1] == '' ? undefined: auth[1];

  if (token && email) {
    pool.query('SELECT * FROM tokens WHERE email=$1', [email], (err, result) =>{
      if(err){
        console.log(err);
        return;
      }
      result = result.rows[0];
      let key = result.key;

      jwt.verify(token, key, (err, decodedToken) =>{
        if(err){
          return res.json({message: "Token expired."});
        }
        
        if(decodedToken.email != email){
          return res.json({message: "Not authorized."});
        }else{
          if(decodedToken.role != 'Admin'){
            return res.json({message: "Not authorized."});
          }else{
            next()
          }
        }
      })
    })
  } else{
    return res.json({message: "Not authorized, token not available."});
  }
};

exports.userAuth = (req, res, next) => {
  let auth = req.headers.auth;
  auth = auth.split(' ');
  let email = auth[0] == '' ? undefined: auth[0];
  let token = auth[1] == '' ? undefined: auth[1];

  if (token && email) {
    pool.query('SELECT * FROM tokens WHERE email=$1', [email], (err, result) =>{
      if(err){
        console.log(err);
        return;
      }
      result = result.rows[0];
      let key = result.key;

      jwt.verify(token, key, (err, decodedToken) =>{
        if(err){
          return res.json({message: "Token expired."});
        }
        
        if(decodedToken.email != email){
          return res.json({message: "Not authorized."});
        }else{
          if(decodedToken.role != 'Basic'){
            return res.json({message: "Not authorized."});
          }else{
            next()
          }
        }
      })
    })
  } else{
    return res.json({message: "Not authorized, token not available."});
  }
};

exports.generateTokenJWT = (res, secret, email) => {
  pool.query("SELECT * FROM users WHERE email=$1", [email], (err, result)=>{
    if(err){
      console.log(err);
      return;
    }
  })
  const maxAge = 10 *60 *60;
  const token = jwt.sign({ email: email, expireTime: Date.now() + expireDuration}, secret, {
    expiresIn: maxAge,
  });
  return token;
};

exports.generateToken = (email, role) => {
  let tokenString = `${Date.now() + 10 *1000}:${email}:${role}`;



  let buffer = new Buffer.from(tokenString);
  let encryptedToken = buffer.toString('base64');
  console.log(encryptedToken);
  return encryptedToken;
}

// İstek gönderirken kullanıcının emailini almak zorunda tokeni kontrol edecek fakat nasıl?
//? cookie kaydetsem sadece email içerecek ve normal expiredate ile aynı olacak

