const fs = require('fs');

module.exports = function (socketId, io) {
    // Read ready state index
    fs.readFile('./serverfiles/json/playerReady.json', (err, data) => {
        if (err) throw err;

        let readyIndex = JSON.parse(data);

        // Change ready state of certain ID
        readyIndex[socketId] = true;

        // Check if all ready
        readyArr = Object.values(readyIndex);
        if (readyArr.every((el) => el)) {
            // Send to everyone that all players ready
            io.emit('all ready')

            // Reset ready index
            for (id in readyIndex) {
                readyIndex[id] = false;
            }
        }

        // Save ready state index
        fs.writeFile('./serverfiles/json/playerReady.json', JSON.stringify(readyIndex), (err) => {
            if (err) throw err;
            console.log(`${socketId} is ready`)
        })
    })
}