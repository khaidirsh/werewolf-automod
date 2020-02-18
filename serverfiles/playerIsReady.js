const db = require('./db')
const nightRoutine = require('./nightRoutine')

module.exports = async (socketId, io) => {
    playerDb = db.getDb().collection('playerList');

    // Update ready state of one ID
    await playerDb.updateOne({ _id: socketId }, { ready: true });

    // Check if all player ready
    readyState = await playerDb.find({}, {
        projection: {
            ready: 1
        }
    }).toArray();

    if (readyState.every(el => el.ready)) {
        // Send to everyone that all players ready
        io.emit('all ready');

        // Reset ready state of all player
        await playerDb.updateMany({}, { ready: false });

        // Call night routine
        setTimeout(() => {
            console.log('Send first night action phase to seer')
            nightRoutine('seer', io, true)      // Seer action at first night
        }, 6000)                                // 3 seconds after 3 seconds wait to render Night after all player ready
    }
}