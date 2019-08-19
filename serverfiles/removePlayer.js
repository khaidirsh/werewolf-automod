const fs = require('fs');

module.exports = function (socketId) {
    fs.readFile('./serverfiles/playerList.json', (err, data) => {
        if (err) throw err;

        // Parse JSON data
        let playerList = JSON.parse(data);

        // Find index of socketId
        let index = playerList.findIndex(playerObj => playerObj.id === socketId)

        if (index !== -1) {
            // Define player nickname
            let nickname = playerList[index].nick;

            // Remove player from player list
            playerList.splice(index, 1);

            // Save new player list
            fs.writeFile('./serverfiles/playerList.json', JSON.stringify(playerList), (err) => {
                if (err) throw err;
                console.log(`${nickname} removed from playerList!`)
            })
        }
    });
}