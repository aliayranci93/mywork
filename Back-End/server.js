const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path')
const multer = require('multer');

const upload = multer();
//web socket
const {WebSocketServer} = require('ws');
const wss = new WebSocketServer({port: 3001});



// -------------------web socket-----------------------------
const clients = [];

// event handler
const socketEvents = new Map;
fs.readdirSync("./socket/events").forEach(eventFile => {
  let event = require(`./socket/events/${eventFile}`);
  socketEvents.set(event.name, event.execute);
})
let socketEvents_keys = Array.from(socketEvents.keys())

//connect
wss.on("connection", (ws) => {
  clients.push(ws);

  //Ex. message data => {name: "dashboard/refreshUsers"}
  ws.on('message', async data => {
    let message = JSON.parse(data.toString()); // it takes buffer so parse to json
    if(socketEvents_keys.includes(message.name)){ // if there is a key for sent message
      let response = await socketEvents.get(message.name)(ws, message); // give funtion parameters (ws, message) => function event(ws, message)
      clients.forEach(client => {
        client.send(response); // gönderirken {name:"", data:} şeklinde gönderiyorum ki cevabı alan neyi yenileyeceğini anlasın
      })
    }
  })

  //disconnect
  ws.on('close', () => {  });
});


//on error
wss.on('error', (error) => {
  console.log(error);
})
//--------------------------------------------------------------


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

// app.get('/token', userAuth, function(req, res){
//   res.json({message:"Success", code: 1})
// });
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
    
    //alt klasör yoksa
    for (let file of files){
        let route = require(`./routes/${folder}/${file}`);
        routes.set(route.name, route.execute);
    }


    //alt klasör varsa
    fs.readdirSync(`./routes/${folder}`).forEach(subFolder => {
      //ve js dosyası değilse
      if(!subFolder.endsWith('.js')){
        let subFiles = fs.readdirSync(`./routes/${folder}/${subFolder}`).filter(file => file.endsWith('.js'));
      for(let file of subFiles){
        let route = require(`./routes/${folder}/${subFolder}/${file}`);
        routes.set(route.name, route.execute);
      }
      }
      
})
})
console.log(routes)
console.log(socketEvents)

//refresh access token
app.post('/refreshToken', routes.get('refreshToken'));

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



app.post('/jira', userAuth, upload.single('file'), routes.get('JIRA-ENT'));



// tasks listAll and list all ıd
app.get('/todo/list', routes.get('todo'));
app.get('/todo/list/:id', routes.get('todo'));
//create tasks User
app.post('/todo/create', routes.get('todo/createTask'));
// create tasks Admin
app.post('/todo/admin/create', routes.get('todoAdmin/createTask'));
// delete tasks Admin
app.delete('/todo/admin/delete/:id', routes.get('todoAdmin/deleteTask'));
// update tasks Admin
app.put('/todo/admin/update/:id', routes.get('todoAdmin/updateTask'));
// change status
app.put('/todo/change/status/:id', routes.get('change/status'));
// assign task
app.put('/todo/assign/:id', routes.get('todo/assign'));


//comment
app.get('/todo/comment', routes.get('comment'));
// comment list 
app.get('/todo/comment', routes.get('comment'));
app.post('/todo/comment', routes.get('commentTasksAdd'));
//comments delete
app.delete('/todo/comment/:id', routes.get('commenetDelete'));
//comment update
app.put('/todo/comment/update/:id', routes.get('commentUpdate'));



app.use(express.static(path.resolve(__dirname + '../../Front-End')));



var server = app.listen(3000, ()=>{console.log("Server listening 127.0.0.1:3000")});