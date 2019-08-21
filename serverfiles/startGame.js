const fs = require('fs');
const shuffle = require('./shuffle')

module.exports = function (socketId, io) {
    console.log('Checking player count..')

    // read player list
    fs.readFile('./serverfiles/json/playerList.json', (err, data) => {
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
            let mainRolesCount = rolesArr.length;

            // Add villagers for remaining role
            for (let i = 0; i < (playerCount - mainRolesCount); i++) {
                rolesArr.push('villager');
            }

            // Shuffle array
            shuffledRoles = shuffle(rolesArr);

            // Create index for main roles, ready state, status, and counter
            let mainRoles = {};
            let playerReady = {};
            let playerStatus = {};
            let roundCount = {day: 1, night: 1};

            for (let i = 0; i < playerCount; i++) {
                // Fill main roles index
                if (shuffledRoles[i] !== 'villager') {
                    mainRoles[shuffledRoles[i]] = playerList[i].id;
                }

                // Send role to respective player
                io.to(playerList[i].id).emit('player role', shuffledRoles[i]);
                console.log(`Role sent to ${playerList[i].nick}`)

                // Fill player ready state index
                playerReady[playerList[i].id] = false;

                // Fill player status index
                playerStatus[playerList[i].id] = true;
            }
            // Save indexes to file
            fs.writeFile('./serverfiles/json/mainRoles.json', JSON.stringify(mainRoles), (err) => {
                if (err) throw err;
                console.log(`Main roles indexed`)
            })
            fs.writeFile('./serverfiles/json/playerReady.json', JSON.stringify(playerReady), (err) => {
                if (err) throw err;
                console.log(`Player ready state indexed`)
            })
            fs.writeFile('./serverfiles/json/playerStatus.json', JSON.stringify(playerStatus), (err) => {
                if (err) throw err;
                console.log(`Player status indexed`)
            })
            fs.writeFile('./serverfiles/json/roundCount.json', JSON.stringify(roundCount), (err) => {
                if (err) throw err;
                console.log(`Round counter created`)
            })
        }
    });
}