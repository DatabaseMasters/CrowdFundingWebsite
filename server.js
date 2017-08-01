const init = (serverConfig) => {
    return Promise.resolve()
        .then(() => require('./db').init(serverConfig.connectionString))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then((app) => {
            app.listen(serverConfig.port, () =>
                console.log(`--- Server working at ${serverConfig.port} ---`));
        })
        .catch((err) => {
            console.log('Error in server.js');
            console.log(err);
            console.log('--- end error ---');
        });
};

module.exports = init;

// Demo1 code left for reference
// TODO remove when app architecture is finished
// const express = require('express');
// const app = express();
// const port = 3001;

// app.listen(port, () =>
//     console.log(`--- Server working at ${port} ---`));
