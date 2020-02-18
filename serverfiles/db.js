const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db

const connect = (mongoUri) => {
    console.log(`Connecting to ${mongoUri}`)
    MongoClient.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(client => {
            console.log("MongoDB database connection established successfully!");
            return _db = client.db();
        }).then(_db => {
            console.log('Initializing player list...')
            return getDb().collection('playerList').deleteMany({});
        }).then(() => {
            console.log('Player list initialized')
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No database found!";
};

exports.connect = connect;
exports.getDb = getDb;
