const express = require('express');
const app = express();

const init = (data) => {
    require('../config/auth.config').configAuth(app, data);
    require('../config/app.config').configApp(app);
    require('./routes')(app, data);

    // logs to the console the current user
    // app.use((req, res, next) => {
    //     console.log('---- Current user -----');
    //     console.log(req.user);
    //     next();
    // });

    return Promise.resolve(app);
};

module.exports = { init };
