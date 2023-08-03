function broadcast(message){
    clients.forEach(client => {
      if(client.readyState === 1){ // connected: 1 -- disconnected: 3
        console.log(client.readyState);
        client.send(message);
      }
    })
  }