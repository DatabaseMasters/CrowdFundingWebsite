const express = require('express');
const app = express();
const data = require('./data');

require('./config/app.config')(app);
require('./config/auth.config')(app, data);
require('./routes')(app);

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

// Check if this chaining is ok?
app
    .get('/', (req, res) => {
        console.log('---- HOME ----');
        return res.render('home');
    })
    .get('/404', (req, res) => {
        return res.render('404');
    });

module.exports = app;
