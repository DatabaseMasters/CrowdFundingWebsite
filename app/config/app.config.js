/* globals __dirname */
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const configApp = (app) => {
    // defines the view engine
    app.set('view engine', 'pug');

    // logs requests
    // app.use(morgan('combined'));

    // enables (post) requests body parsing for json
    app.use(bodyParser.json());

    // enables (post) requests body parsing for form data
    app.use(bodyParser.urlencoded({ extended: true }));

    // calculates execution time of requests
    app.use((req, res, done) => {
        const start = new Date();

        req.on('end', () => {
            const end = new Date();
            console.log(`---- Execution time ${end - start} ms ---- `);
        });

        done();
    });

    // serves public files
    app.use('/static',
        express.static(
            path.join(__dirname, '../../static'))
    );

    // serves libraries
    app.use('/libs',
        express.static(
            path.join(__dirname, '../../node_modules')
        ));

    // makes favicon.ico visible. Check if ok?
    app.use('/',
        express.static(
            path.join(__dirname, '../../')
        ));
};

module.exports = configApp;
