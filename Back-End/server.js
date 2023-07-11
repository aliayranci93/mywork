const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

//JSON WEB TOKEN
const jwt = require('jsonwebtoken');
const jwtSecret = '541657132c6ca0bf0672c3def16682ee44e6f8bfd417df755b5669d57ad7bd1e1422a7';
const { adminAuth, userAuth } = require("./auth.js");
const cookieParser = require("cookie-parser");
app.use(cookieParser())

//! kullanıcı yetkisi /user | admin yetkisi /users
//? token fikri <10072023>*TOKEN=?<userid>&<time><random_values/w rule>

//Database
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mywork',
  password: 'password',
  port: 5432,
})

module.exports = {Pool ,pool, jwt, jwtSecret}


//TEST API

app.get('/status', function(req, res){
    const status = {
        "Status":"Running"
    }

    res.send(status);
});


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//Route Handler
const routes = new Map;

fs.readdirSync('./routes').forEach(folder => {
    let files = fs.readdirSync(`./routes/${folder}`).filter(file => file.endsWith('.js'));
    for (let file of files){
        let route = require(`./routes/${folder}/${file}`);
        routes.set(route.name, route.execute);
    }
})
console.log(routes)

//Login
app.post('/login', routes.get('login'));
//Register
app.post('/register', routes.get('register'));


//Get All Users
app.get('/users/all', adminAuth, routes.get('admin/getAllData'));


//Get User Info (self request)
app.get('/user/self', userAuth, routes.get('user/getData'));



//! USE res.status and res.json!!!!!!! multiple sending responses with them!!
//Delete User Info
app.delete('/users/delete', adminAuth, routes.get('admin/deleteUser'));

//Update User Info 
app.patch('/user/update', userAuth, routes.get('user/updateData'))


var server = app.listen(8081, ()=>{console.log("Server listening 127.0.0.1:8081")});