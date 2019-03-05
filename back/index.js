var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
const port = 3001;
const users = new Map();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/api", function(req, res) {
  res.send(req.body);
  console.log(res.body);
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  console.log("user Connection");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", msg => {
    console.log(msg);
    io.emit("newMessage", msg);
    // io.emit("chatMessage", { msg: msg, user: users.get(socket.id) });
  });

  socket.on("register", name => {
    users.set(socket.id, name);
    console.log(name);
  });
});

io.on("message", msg => {
  console.log(msg);
});

http.listen(port, function() {
  console.log(`listening on port *:${port}`);
});
