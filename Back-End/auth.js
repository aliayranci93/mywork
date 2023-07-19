const jwt = require("jsonwebtoken");

const expireDuration = 1 *1000 //Change the first number (in seconds)

//Database
const {pool} = require('./utils/connection.js');


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
      if(!result.rows[0]) return res.json({message: "Token not found."});
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
      if(!result.rows[0]) return res.json({message: "Token not found."});
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