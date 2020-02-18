const express = require('express');
const path = require('path');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 9000;

const addPlayer = require('./serverfiles/addPlayer');
const removePlayer = require('./serverfiles/removePlayer');
const startGame = require('./serverfiles/startGame');
const playerIsReady = require('./serverfiles/playerIsReady');
const getRoundCount = require('./serverfiles/getRoundCount');
const db = require('./serverfiles/db');

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

app.use(express.static(path.join(__dirname, "build")));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// For first connected player
let admin = true;

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

    // Add player to player list
    socket.on("nick", (nick) => {
        addPlayer(socket.id, nick, admin, io);

        // Set false after first connected player
        if (admin) {
            admin = false
        }
    });

    // Remove player from player list
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
        removePlayer(socket.id);
    });

    // Retrieve game start command
    socket.on('start game', () => {
        console.log('Retrieved command to start the game')
        startGame(socket.id, io)
    })

    // Retrieve player ready state change
    socket.on('ready', () => {
        playerIsReady(socket.id, io)
    })

    // Send back round counter
    socket.on('counter', (roundType, fn) => {
        fn(getRoundCount(roundType));
    })
});

db.connect("mongodb://localhost:27017/werewolf-automod");

server.listen(port, () => console.log(`Server listening on port ${port}`));