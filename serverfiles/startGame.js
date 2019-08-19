const fs = require('fs');
const shuffle = require('./shuffle')

module.exports = function (socketId, io) {
    console.log('Checking player count..')

    // read player list
    fs.readFile('./serverfiles/playerList.json', (err, data) => {
        if (err) throw err;

        let playerList = JSON.parse(data);
        let playerCount = playerList.length;

        // check player count
        if (playerCount < 5) {
            console.log('Insufficient player to start the game');
            io.to(socketId).emit('insufficient');
        } else {
            console.log('Randomizing role..')

            // Create array of main roles
            let rolesArr = ['werewolf', 'seer', 'guardian'];
            let mainRoles = rolesArr.length;

            // Add villagers for remaining role
            for (let i = 0; i < (playerCount - mainRoles); i++) {
                rolesArr.push('villager');
            }

            // Shuffle array
            shuffledRoles = shuffle(rolesArr);

            // Send role to respective player
            for (let i = 0; i < playerCount; i++) {
                io.to(playerList[i].id).emit('player role', shuffledRoles[i]);
                console.log(`Role sent to ${playerList[i].nick}`)
            }
            console.log('Waiting for all players to be ready..')
        }
    });
}