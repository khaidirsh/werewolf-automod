const db = require('./db')

module.exports = async (nextRole, io, firstNight) => {
    const playerDb = db.getDb().collection('playerList');
    
    // Get player with nextRole
    const nextPlayer = await playerDb.findOne({
        role: nextRole
    });

    // Send command to all player to play action phase sound
    io.emit(`wake ${nextRole}`);

    if (nextPlayer.alive) {
        // Send command to main role to start action phase
        io.to(nextPlayer._id).emit('action', firstNight);
    } else {
        // If main role not alive, play come back to sleep sound
        setTimeout(() => {
            io.emit(`${nextRole} sleep`)
        }, Math.random() * 2000 + 3000)
    }
}