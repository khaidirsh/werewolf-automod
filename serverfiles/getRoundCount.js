const db = require('./db')

module.exports = async (roundType) => {
    // read file
    roundCount = await db.getDb().collection('gameStats').findOne({_id: "counter"});

    // return
    return roundCount[roundType]
}