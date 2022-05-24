const express = require('express'),
  app = express(),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 8080;
const path = require('path');
const http = require('http').createServer(app);
const webSocket = require('ws');

const socket = new webSocket.Server({ port: 8080 })

socket.on('connection', function connection(ws) {
  ws.on('open', function open() {

  });

  ws.on('message', data => {
    try {
      console.log(JSON.parse(data));
      var new_position = {
        x: 480 - Math.random() * 960, 
        y: 260 - Math.random() * 520
      }
      var new_color = {
        r: Math.floor(Math.random() * 256), 
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
      }
      var time = Math.round(Math.random() * 10)
      ws.send(JSON.stringify({time: time, new_color: new_color, new_position: new_position}));
    }  
    catch {
      console.log(data);
    }
  })
});

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'./public')));

//enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

http.listen(process.env.PORT || 3070,  ()=> {
  console.log('listening on *:' + port);
});