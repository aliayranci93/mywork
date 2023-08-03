const jwt = require("jsonwebtoken");

const expireDuration = 1 *1000 //Change the first number (in seconds)

//Database
const {pool, Pool} = require('./utils/connection.js');


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
      if(!result.rows[0]) return res.json({message: "Token not found.", code:-1});
      result = result.rows[0];
      let key = result.key;

      jwt.verify(token, key, (err, decodedToken) =>{
        if(err){
          return res.json({message: "Token expired.", code:-1});
        }
        
        if(decodedToken.email != email){
          return res.json({message: "Not authorized.", code:-1});
        }else{
          if(decodedToken.role != 'Admin'){
            return res.json({message: "Not authorized.", code:-1});
          }else{
            //req.auth = generateToken(email);
            next()
          }
        }
      })
    })
  } else{
    return res.json({message: "Not authorized, token not available.", code:-1});
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
      if(!result.rows[0]) return res.json({message: "Token not found.", code:-1});
      result = result.rows[0];
      let key = result.key;


      jwt.verify(token, key, (err, decodedToken) =>{
        if(err){
          //token expire kısmı
          // pool.query('SELECT refresh_token, key FROM tokens WHERE email=$1', [email], (err, result) => {
          //   if(err){
          //     console.log(err);
          //     return;
          //   }
          //   let refreshToken = result.rows[0].refresh_token;
          //   let key = result.rows[0].key;
          //   if(!refreshToken){
          //     return res.json({message: "Token expired.", code:-1});
          //   }

            // jwt.verify(refreshToken, key, (err, decodedRefreshToken) => {
            //   if(err){
            //     console.log(err);
            //     return
            //   }
            //   dec
            // })

          // })
          return res.json({message: "Token expired.", code:-1});
        }
        
        if(decodedToken.email != email){
          return res.json({message: "Not authorized.", code:-1});
        }else{
          if(decodedToken.role != 'Basic' && decodedToken.role != 'Admin'){
            return res.json({message: "Not authorized.", code:-1});
          }else{
            //req.token = generateToken(email);
            next()
          }
        }
      })
    })
  } else{
    return res.json({message: "Not authorized, token not available.", code:-1});
  }
};


// function generateToken(email){
//   const key = crypto.createHash('sha256').update(`${Date.now()}:${email}`, 'utf-8').digest('hex');
//   const token = jwt.sign({email: email, role: result.role}, key, {expiresIn: '15m'})

//   // bu api olumlu cevaplanırsa yapması lazım
//   pool.query('UPDATE tokens SET key=$1 WHERE email=$2', [key, email], (err)=>{
//     if(err){
//       console.log(err);
//       return;
//     }
//   })
// }