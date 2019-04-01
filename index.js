var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var bodyParser = require('body-parser')
const nanoID = require('nanoid')

const port = 3001
const users = new Map()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/api', function(req, res) {
  res.send(req.body)
  console.log(res.body)
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  console.log('user Connection')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('a', q => {
    console.log('A socket')
    console.log(q)
    socket.emit('B', 'asd')
  })

  socket.on('message', data => {
    console.log(data)
    const messageData = {
      user: {
        id: socket.id,
        user: data.name,
        src: data.src
      },
      message: {
        id: nanoID(),
        message: data.message
      }
    }

    io.emit('newMessage', messageData)
  })

  socket.on('register', name => {
    users.set(socket.id, name)
    console.log(name)
  })
})

io.on('message', msg => {
  console.log(msg)
})

http.listen(process.env.PORT || 3001, function() {
  console.log(`listening on port *:${port}`)
})
