const { MongoClient } = require('mongodb');

// Returns an instance of db object
const init = (connectionString) => {
    return MongoClient.connect(connectionString);
};

module.exports = { init };
