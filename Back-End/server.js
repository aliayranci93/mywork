const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path')


//JSON WEB TOKEN
const jwt = require('jsonwebtoken');
const { adminAuth, userAuth } = require("./auth.js");
const { parse } = require('path');
// const cookieParser = require("cookie-parser");
// app.use(cookieParser())

//Database
// const {pool} = require('./utils/connection.js');

module.exports = { jwt }


//TEST API

app.get('/token', userAuth, function(req, res){
  res.json({message:"Success", code: 1})
});
app.get('/admin', adminAuth, (req, res) => {
  res.json({code: 1})
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
app.get('/users/all', userAuth, routes.get('admin/getAllData'));


//Get User Info (self request)
app.get('/user/self', userAuth, routes.get('user/getData'));

//Admin update user
app.patch('/admin/updateUser', adminAuth, routes.get('admin/UpdateUser'));



//! USE res.status and res.json!!!!!!! multiple sending responses with them!!
//Delete User Info
app.delete('/users/delete', adminAuth, routes.get('admin/deleteUser'));

//Update User Info 
app.patch('/user/update', userAuth, routes.get('user/updateData'))

//.TODO listAll
//app.get('/todo/list', userAuth, routes.get('todoUser/list'))

//.TODO assign task
//app.patch('/todo/assign', userAuth, routes.get('todoUser/assign'))

//.TODO unassign task
//app.patch('/todo/unassign', userAuth, routes.get('todoUser/unassign'))

//.TODO change task status
//app.patch('/todo/change/status', userAuth, routes.get('todoUser/change/status'));

//.TODO add comment for task 
//app.post('/todo/comment', userAuth, routes.get('todoUser/comment'))

//.TODO createTask (ADMIN ONLY!)
//app.post('/todo/admin/create', routes.get('todoAdmin/createTask'));

app.get('/jira', routes.get('JIRA-ENT'));

app.use(express.static(path.resolve(__dirname + '../../Front-End')));
var server = app.listen(3000, ()=>{console.log("Server listening 127.0.0.1:3000")});