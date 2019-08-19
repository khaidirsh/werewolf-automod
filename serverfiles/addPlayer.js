const fs = require('fs');

module.exports = function (socketId, nickname, io) {
    let obj = { id: socketId, nick: nickname, admin: false };
    fs.readFile('./serverfiles/json/playerList.json', (err, data) => {
        if (err) throw err;
        let playerList = JSON.parse(data);

        // Set admin to first connected player
        if (playerList.length === 0) {
            obj.admin = true;
        }

        playerList.push(obj);
        fs.writeFile('./serverfiles/json/playerList.json', JSON.stringify(playerList), (err) => {
            if (err) throw err;
            console.log(`${nickname} added to playerList`)
        })

        // Send master status to client
        io.to(socketId).emit('master', obj.admin);
        console.log(`${nickname} master status: ${obj.admin}`)
    });
}