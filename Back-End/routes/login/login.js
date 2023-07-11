const {Pool, pool, jwt} = require('../../server.js');
const {registerCookie} = require('../../auth.js');

module.exports = {
    name: "login",
    execute: (req, res) => {
            let email = req.body.email == '' ? undefined : req.body.email;
            var password = req.body.password == '' ? undefined : req.body.password;
            if(!email || !password){
                res.json({message: "Fill the parameters."})
                return;
            }
            pool.query("SELECT * FROM accounts WHERE email=$1", [`${email}`],function (err, result){
                if(err){
                    console.log(err);
                    return;
                }else{
                    result = result.rows[0]; // ilk objeyi alsın zaten unique email
                    if(!result){
                        res.json({
                            message: "No such account!"
                        })
                        return;
                    }
                    if(password == result.password){
                        // Kullanıcı rollerini httpye kaydetme
                        registerCookie(res, jwt, email, result.role)
                    //
                        result["login"] = true;
                        res.send(result);
                    }else{
                        let respond = {"login":false}
                        res.send(respond);
                    }
                    
                }
            })
        }
    }
