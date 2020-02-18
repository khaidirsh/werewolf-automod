const db = require('./db')
const shuffle = require('./shuffle')

module.exports = async (socketId, io) => {
    const playerDb = db.getDb().collection('playerList');
    console.log('Checking player count..')

    // Check player count
    playerCount = await playerDb.countDocuments();
    if (playerCount < 5) {
        console.log('Insufficient player to start the game');
        io.to(socketId).emit('insufficient');
    } else {
        console.log('Randomizing role..')
        // Init db
        const statsDb = db.getDb().collection('gameStats')

        // Get player list
        const playerList = await playerDb.find({}).toArray()

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
        await statsDb.updateOne({ _id: "counter" }, { day: 1, night: 1 })

        for (let i = 0; i < playerCount; i++) {
            // Send role, alive, and ready to respective player
            await playerDb.updateOne({ _id: playerList[i]._id }, {
                role: shuffledRoles[i],
                alive: true,
                ready: false
            })
            io.to(playerList[i]._id).emit('player role', shuffledRoles[i]);
            console.log(`Role sent to ${playerList[i].nick}`)
        }
    }
}