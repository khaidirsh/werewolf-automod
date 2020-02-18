const db = require('./db');

module.exports = async (socketId) => {
    const playerList = db.getDb().collection('playerList');
    const player = await playerList.findOne({_id: socketId});
    if (player) {
        await playerList.deleteOne({_id: socketId});
        console.log(`${player.nick} removed from player list.`)
    }
}