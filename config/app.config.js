/* globals __dirname */
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const flash = require('connect-flash');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const configApp = (app) => {
    // defines the view engine
    app.set('view engine', 'pug');

    // logs requests
    // app.use(morgan('combined'));

    // enables (post) requests body parsing for json
    app.use(bodyParser.json());

    // enables (post) requests body parsing for form data
    app.use(bodyParser.urlencoded({ extended: true }));

    // flash messages config
    app.use(flash());
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        res.locals.user = req.user;
        next();
    });

    // Middleware sample: calculates execution time of requests
    // REVIEW: do we need this
    // app.use((req, res, done) => {
    //     const start = new Date();

    //     req.on('end', () => {
    //         const end = new Date();
    //         console.log(`---- Execution time ${end - start} ms ---- `);
    //     });

    //     done();
    // });

    app.use(multer({
        storage: multer.diskStorage({
            destination: (req, file, callback) => {
                const dest = 'static/uploads/' + req.user.username;

                if (!fs.existsSync(dest)) {
                    fs.mkdirSync(dest);
                }
                callback(null, dest);
            },
        }),
        fileFilter: (req, file, cb) => {
            const filetypes = /jpeg|jpg|png/;
            const extension = new RegExp(/\./ + filetypes + /$/);

            const mimetype = filetypes.test(file.mimetype);
            const extname = extension
                .test(path.extname(file.originalname).toLowerCase());

            if (mimetype && extname) {
                return cb(null, true);
            }

            req.flash('error',
                'Error: File upload only supports the following filetypes - ' +
                filetypes);

            return cb(null, false);
        },
        limits: { fileSize: 2000000 },
    }).single('img'));

    // serves public files
    app.use('/static',
        express.static(
            path.join(__dirname, '../static'))
    );

    // serves libraries
    app.use('/libs',
        express.static(
            path.join(__dirname, '../node_modules')
        ));

    // makes favicon.ico visible. Check if ok?
    // app.use('/',
    //     express.static(
    //         path.join(__dirname, '../../')
    //     ));
};

module.exports = { configApp };
