/* globals __dirname */
const fs = require('fs');
const path = require('path');

// Dynamic load of all routers in folder
const attachRoutes = (app, data) => {
    // TODO: Check if this chaining is ok?
    app
        .get('/', (req, res) => {
            console.log('---- HOME ----');
            return res.render('home');
        })
        .get('/404', (req, res) => {
            return res.render('404');
        });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('router.js'))
        .map((file) => path.join(__dirname, file))
        .forEach((modulePath) => require(modulePath)(app, data));

    // non dynamic way to attach
    // have to add every route file manually
    // require('./routes/api.routes')(app);
    // require('./routes/server.routes')(app);
};

module.exports = attachRoutes;
