/* globals __dirname */
const fs = require('fs');
const path = require('path');

// Dynamic load of all routers in folder
const attachRoutes = (app) => {
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('router.js'))
        .map((file) => path.join(__dirname, file))
        .forEach((modulePath) => require(modulePath)(app));

    // non dynamic way to attach
    // have to add every route file manually
    // require('./routes/api.routes')(app);
    // require('./routes/server.routes')(app);
};

module.exports = attachRoutes;
