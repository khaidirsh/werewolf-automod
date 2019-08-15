const fs = require('fs');

module.exports = function (socketId, nickname) {
    let obj = {id: socketId, nick: nickname};
    fs.readFile('./serverfiles/playerList.json', (err, data) => {
        if (err) throw err;
        let playerList = JSON.parse(data);
        playerList.push(obj);
        fs.writeFile('./serverfiles/playerList.json', JSON.stringify(playerList), (err) => {
            if (err) throw err;
            console.log(`${nickname} added to playerList!`)
        })
    });
}