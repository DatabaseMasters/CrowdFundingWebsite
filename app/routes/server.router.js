const { Router } = require('express');

const attachRoutes = (app, data) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            return res.render('home');
        })
        .get('/about', (req, res) => {
            return res.render('about');
        })
        .get('/contact', (req, res) => {
            return res.render('shared/contact');
        })
        .get('/404', (req, res) => {
            return res.render('404');
        })
        .get('*', (req, res) => {
            console.log('----- REDIRECTING -----');
            res.redirect('/404');
        });

    app.use('/', router);
};

module.exports = attachRoutes;
