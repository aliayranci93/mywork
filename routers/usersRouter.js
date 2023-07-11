const router =require("express").Router();

server.post("/users", (req, res) => {
    let next_users = req.body;
    next_users.id = next_id;
    next_id++;
    data.push(next_users);
    res.status(201).json(next_users);
    res.send("post istegi gönderildi");
  });
  
  // server.put("/", (req, res) => {
  //   res.send("put istegi gönderildi");
  // });
  
  server.get("/users", (req, res) => {
    res.status(200).json(data);
    res.send("kullaniciler istegi gonderildi...");
  });
  
  server.delete("/users/:id", (req, res) => {
    const delete_users_id = req.params.id;
    const delete_id = data.find((users) => users.id == Number(delete_users_id));
  
    if (delete_id) {
      data = data.filter((users) => users.id != Number(delete_users_id));
      res.status(204).end(); // 204: başarılı olarak silindi
    } else {
      res.status(404).json({ errorMessage: "kullanici kayitli degil" });
    }
  });
  
  server.get("/users/:id", (req, res) => {
    console.log("req.body", req.body);
    const { id } = req.params;
    const user = data.find((user) => user.id === parseInt(id));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("kulanici bulunamadi");
    }
  });

module.exports = router;