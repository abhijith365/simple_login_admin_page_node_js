const MongoClient = require('mongodb').MongoClient;

const state = {
    _db: null
}


module.exports = {

    connectToServer: function (callback) {
        const url = "mongodb://127.0.0.1:27017/";
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
            state._db = client.db('week_06_pro');
            return callback(err);
        });

    },

    getDb: function () {
        return state._db;
    }
};

