const { jwt } = require("../../../server");
const { pool, Pool } = require("../../../utils/connection")

module.exports = {
    name:"refreshToken",
    execute: async (req, res) =>{
        let email = req.headers.auth.split(' ')[0] ===  'undefined' ? undefined: req.headers.auth.split(' ')[0];
        let accessToken = req.headers.auth.split(' ')[1] ===  'undefined' ? undefined: req.headers.auth.split(' ')[1];;
        if(!email || !accessToken){
            res.json({code: -1});
            return;
        }
        let result = await new Promise((resolve, reject) => {
            pool.query('SELECT refresh_token, key FROM tokens WHERE email=$1', [email], (err, result) => {
                if(err){
                  reject(err);
                }
                let results = result.rows[0];
                resolve(results);
            })
        })
        if(!result){
            res.json({code: -1})
            return;
        }
        jwt.verify(result.refresh_token, result.key, async (err, decodedToken) => {
            if(err){
                //token geçerliliği bitmişse(yeniden login olmalı)
                console.log(err);
                res.json({code: -1})
                return;
            }
            let {role} = await new Promise((resolve, reject) => {
                pool.query('SELECT role FROM accounts WHERE email=$1', [email], (err, result) =>{
                    if(err){
                        reject(err)
                    }
                    if(!result.rows[0]){
                        reject();
                    }

                    resolve(result.rows[0]);
                })
            })
            let newAccessToken = jwt.sign({email: email, role: role}, result.key, {expiresIn: '15m'});
            res.json({token: newAccessToken, code: 1});
        })
        
    }
}