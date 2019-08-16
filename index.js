const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const socketLayer = require("./socket.js");
const MessageController = require("./controllers/message.controller.js");

const port = 3001;
const users = new Map();
const mongoDB = "mongodb://listar:375477787aA@ds113871.mlab.com:13871/listardb";

// Conntect to MLab
mongoose.connect(mongoDB, err => {
  if (err) throw err;
});

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
socketLayer.socket(io);

http.listen(process.env.PORT || port, function() {
  console.log(`listening on port *:${process.env.PORT || port}`);
});
