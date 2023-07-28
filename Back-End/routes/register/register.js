const {pool, Pool} = require('../../utils/connection.js');
const {getUsersEmails} = require('../../methods/user.js');

module.exports = {
    name:"register",
    execute: async (req, res) =>{
        //? email arama kısmı kaldırılabilir database error
    let password = req.body.password =='' ? undefined: req.body.password;
    let password2 = req.body.re_password =='' ? undefined: req.body.re_password;
    let email = req.body.email == '' ? undefined : req.body.email;
    let name = req.body.name == '' ? undefined : req.body.name;

    if(!email || !password){
        res.json({message:"Fill the parameters"})
        return;
    }
    
    
    //Password Confirmation
    if(password != password2){
        res.json({message:"Passwords didn't match!", code:0});
        return;
    }

    
    //Are email and username in use?
    let emails = await getUsersEmails().catch(err => {
        console.log(err);
        return;
    })

    if(emails.includes(`${email}`)){
        res.json({message:"Email already using!", code:0});
        return;
    }
    

    
    //Inserting data to database
    query = "INSERT INTO accounts (email, password, role) VALUES ($1, $2, $3)"
    pool.query(query, [email, password, "Basic"], (err, result)=>{
        let respond;
        if(err){
            respond = {message:"Database error!", code:0};
            console.log(err)
        }else{ 
            // Kullanıcı rollerini httpye kaydetme

            //
            respond = {message:"User registered succesfully", code:1};
        }
        
        pool.query('INSERT INTO tokens (email) VALUES ($1)', [email], (err)=>{
            console.log(err);
        })
        pool.query('INSERT INTO users (email, name) VALUES ($1, $2)', [email, name], (err)=>{
            console.log(err);
        })

        
        res.send(respond);

    });
    }
}