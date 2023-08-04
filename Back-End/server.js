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
    if(socketEvents_keys.includes(message.name)){ 
      // if there is a key for sent message
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

app.patch("/contact/info/set", routes.get("contact/setContactInfo"));

app.get("/contact/map/get", routes.get("contact/getMap"));

app.get("/contact/info/get", routes.get("contact/getContact"));

app.post("/contact/info/send", routes.get("contact/contactSend"));

app.get("/main/news", routes.get("mainMenu/getNews"));

/* app.get('/main/search_task', routes.get('mainMenu/taskSearch')); */

//.TODO add comment for task
//app.post('/todo/comment', userAuth, routes.get('todoUser/comment'))

app.post("/main/add_news", routes.get("mainMenu/addNews"));

//Update Account By Admin
app.patch("/account/update", adminAuth, routes.get("admin/updateAccount"));

//Update Account By Admin
//app.patch("/account/update", userAuth, routes.get("user/updateAccount"));

//Add Status By Admin
app.post("/todo/status/add", adminAuth, routes.get("admin/addStatus"));
//Update Status By Admin
//app.patch("/todo/status/update",adminAuth, routes.get("admin/updateStatus"));
//Delete Status By Admin
app.delete("/todo/status/delete", adminAuth, routes.get("admin/deleteStatus"));
//List Status By Admin
app.get("/todo/status/list", routes.get("admin/listStatus"));

//Create Project By Admin
app.post("/todo/projects/create", adminAuth, routes.get("admin/createProject"));
//Update Project By Admin
//app.patch(
//  "/todo/projects/update",
//  adminAuth,
//  routes.get("admin/updateProject")
//);
//Delete Project By Admin
app.delete(
  "/todo/projects/delete",
  adminAuth,
  routes.get("admin/deleteProject")
);
////List Projects By Admin
app.get("/todo/projects/list", adminAuth, routes.get("admin/listProjects"));

app.get("/jira", routes.get("JIRA-ENT"));

var server = app.listen(3000, () => {
  console.log("Server listening 127.0.0.1:3000");
});
