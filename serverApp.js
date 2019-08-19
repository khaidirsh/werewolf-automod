const express = require('express');
const path = require('path');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');
const port = 9000;

const addPlayer = require('./serverfiles/addPlayer');
const removePlayer = require('./serverfiles/removePlayer');
const startGame = require('./serverfiles/startGame');

/* FEATURE TO BE ADDED: CONTINUE IF PLAYER DISCONNECTED
app.use(express.cookieParser());

// set a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next();
});
*/

// Initialize files
fs.writeFile('./serverfiles/playerList.json', JSON.stringify([]), (err) => {
    if (err) throw err;
    console.log("playerList initialized")
})

app.use(express.static(path.join(__dirname, "build")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

    // Add player to player list
    socket.on("nick", (nick) => {
        addPlayer(socket.id, nick, io);
    });

    // Remove player from player list
    socket.on('disconnect', () => {
        removePlayer(socket.id);
        console.log(`${socket.id} disconnected`);
    });

    // Retrieve game start command
    socket.on('start game', () => {
        console.log('Retrieved command to start the game')
        startGame(socket.id, io)
    })
});

server.listen(port, () => console.log(`Server listening on port ${port}`));