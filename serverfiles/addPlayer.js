const db = require('./db')

module.exports = async (socketId, nickname, admin, io) => {
    let obj = { _id: socketId, nick: nickname, admin };
    await db.getDb().collection('playerList').insertOne(obj)
    console.log(`${obj.nick} added to player list.`)

    // Send master status to client
    io.to(socketId).emit('master', obj.admin);
    console.log(`${nickname} master status: ${obj.admin}`)
};