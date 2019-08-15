const express = require('express');
const path = require('path');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 9000

/*
app.use(express.cookieParser());

// set a cookie to continue game (TO BE BUILT)
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
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', async (socket) => {
    console.log('User connected with ID: ' + socket.id);
    socket.on('nick', function(nick) {
        console.log(nick);
    })
});

server.listen(port, () => console.log(`Server listening on port ${port}!`))