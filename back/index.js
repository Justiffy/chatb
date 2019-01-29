var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
const port = 3001;

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

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  }); // chatMessage

  socket.on("message", msg => {
    console.log(msg);
    io.emit("chatMessage", msg);
  });
});

io.on("message", msg => {
  console.log(msg);
});

http.listen(port, function() {
  console.log(`listening on port *:${port}`);
});
