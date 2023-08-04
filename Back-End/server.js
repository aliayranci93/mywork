const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");

//JSON WEB TOKEN
const jwt = require("jsonwebtoken");
const { adminAuth, userAuth } = require("./auth.js");
const { parse } = require("path");
// const cookieParser = require("cookie-parser");
// app.use(cookieParser())

//Database
// const {pool} = require('./utils/connection.js');

module.exports = { jwt };

//TEST API

app.get("/status", function (req, res) {
  const status = {
    Status: "Running",
  };
  res.send(status);
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Route Handler
const routes = new Map();

fs.readdirSync("./routes").forEach((folder) => {
  let files = fs
    .readdirSync(`./routes/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (let file of files) {
    let route = require(`./routes/${folder}/${file}`);
    routes.set(route.name, route.execute);
  }
});
console.log(routes);

//Login
app.post("/login", routes.get("login"));
//Register
app.post("/register", routes.get("register"));

//Get All Users
app.get("/users/all", adminAuth, routes.get("admin/getAllData"));

//Get User Info (self request)
app.get("/user/self", userAuth, routes.get("user/getData"));

//! USE res.status and res.json!!!!!!! multiple sending responses with them!!
//Delete User Info
app.delete("/users/delete", adminAuth, routes.get("admin/deleteUser"));

//Update User Info
app.patch("/user/update", userAuth, routes.get("user/updateData"));

//.TODO listAll
//app.get('/todo/list', routes.get('todoUser/list'))

//.TODO assign task
//app.patch('/todo/assign', userAuth, routes.get('todoUser/assign'))

//.TODO unassign task
//app.patch('/todo/unassign', userAuth, routes.get('todoUser/unassign'))

//.TODO change task status
//app.patch('/todo/change/status', userAuth, routes.get('todoUser/change/status'));

//.TODO add comment for task
//app.post('/todo/comment', userAuth, routes.get('todoUser/comment'))

//.TODO createTask (ADMIN ONLY!)
//app.post('/todo/create', routes.get('todoAdmin/createTask'));

//Update Account By Admin
app.patch("/account/update", adminAuth, routes.get("admin/updateAccount"));

//Update Account By Admin
//app.patch("/account/update", userAuth, routes.get("user/updateAccount"));

//Add Status By Admin
app.post("/todo/status/add", routes.get("admin/addStatus"));
//Update Status By Admin
app.patch("/todo/status/update", routes.get("admin/updateStatus"));
//Delete Status By Admin
app.delete("/todo/status/delete", routes.get("admin/deleteStatus"));
//List Status By Admin
app.get("/todo/status/list", routes.get("admin/listStatus"));

//Create Project By Admin
app.post("/todo/projects/create", routes.get("admin/createProject"));
//Update Project By Admin
//app.patch(
//  "/todo/projects/update",
//  adminAuth,
//  routes.get("admin/updateProject")
//);
//Delete Project By Admin
//app.delete(
//  "/todo/projects/delete",
//  adminAuth,
//  routes.get("admin/deleteProject")
//);
////List Projects By Admin
//app.get("/todo/projects/list", adminAuth, routes.get("admin/listProjects"));

app.get("/jira", routes.get("JIRA-ENT"));

var server = app.listen(3000, () => {
  console.log("Server listening 127.0.0.1:3000");
});
