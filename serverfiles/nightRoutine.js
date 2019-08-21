const fs = require('fs');

module.exports = function (nextRole, io, firstNight) {
    // Read main roles index
    fs.readFile('./serverfiles/json/mainRoles.json', (err, roles) => {
        if (err) throw err;

        mainRole = JSON.parse(roles);

        // Read player status index
        fs.readFile('./serverfiles/json/playerStatus.json', (err, status) => {
            if (err) throw err;

            playerStatus = JSON.parse(status);

            // Send command to all player to play action phase sound
            io.emit(`wake ${nextRole}`);

            if (playerStatus[mainRole[nextRole]]) {
                // Send command to main role to start action phase
                io.to(mainRole[nextRole]).emit('action', firstNight);
            } else {
                // If main role not alive, play come back to sleep sound
                setTimeout(() => {
                    io.emit(`${nextRole} sleep`)
                }, Math.random() * 2000 + 3000)
            }
        })
    })
}