/* globals __dirname */
const fs = require('fs');
const path = require('path');

const attachRoutes = (app, data) => {
    // Dynamic load of all routers in folder
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('router.js'))
        .map((file) => path.join(__dirname, file))
        .forEach((modulePath) => require(modulePath)(app, data));
};

module.exports = attachRoutes;
