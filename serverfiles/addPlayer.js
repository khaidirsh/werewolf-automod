const fs = require('fs');

module.exports = function (socketId, nickname, io) {
    let obj = { id: socketId, nick: nickname, admin: false };
    fs.readFile('./serverfiles/playerList.json', (err, data) => {
        if (err) throw err;
        let playerList = JSON.parse(data);

        // Set admin to first connected player
        if (playerList.length === 0) {
            obj.admin = true;
        }

        playerList.push(obj);
        fs.writeFile('./serverfiles/playerList.json', JSON.stringify(playerList), (err) => {
            if (err) throw err;
            console.log(`${nickname} added to playerList!`)
        })

        // Send admin status to client
        io.to(socketId).emit('admin', obj.admin);
        console.log(`${socketId} admin: (${obj.admin})`)
    });
}