/* globals __dirname */
const fs = require('fs');
const path = require('path');

// Dynamic load of all routers in folder
const attachRoutes = (app, data) => {
    // TODO: Check if this chaining is ok? Fix 404 not loading
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

};

module.exports = attachRoutes;
