const express = require('express');
const app = express();

const init = (data) => {
    require('../config/auth.config').configAuth(app, data);
    require('../config/app.config').configApp(app);
    require('./routes')(app, data);

    app.use((req, res, next) => {
        console.log('---- Current user -----');
        console.log(req.user);
        next();
    });

    // app.get('/404', (req, res) => {
    //     return res.send('<h1>Error</h1>');
    // });
    // This get never fires because 
    // all wrong urls are caught by the get('/:id')
    // app.get('*', (req, res) => {
    //     console.log('----- REDIRECTING -----');
    //     res.redirect('/404');
    // });

    return Promise.resolve(app);
};

module.exports = { init };
