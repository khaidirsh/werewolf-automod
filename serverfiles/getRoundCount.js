const fs = require('fs');

module.exports = function (roundType) {
    // read file
    roundCount = JSON.parse(fs.readFileSync('./serverfiles/json/roundCount.json'));

    // return
    return roundCount[roundType]
}