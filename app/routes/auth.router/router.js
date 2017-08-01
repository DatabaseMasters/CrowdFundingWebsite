const { Router } = require('express');
const passport = require('passport');
const login = require('connect-ensure-login');
const { init } = require('./controller');

const attachRoutes = (app, data) => {
    const router = new Router();
    const controller = init(data);
    router
        .get('/log-in', (req, res) => {
            return res.render('auth/log-in');
        })
        .post('/log-in',
        passport.authenticate('local', {
            successReturnToOrRedirect: '/',
            failureRedirect: '/auth/log-in',
            failureFlash: true,
            successFlash: 'Welcome!',
        })
        )
        .get('/log-out', (req, res) => {
            req.logout();
            res.redirect('/');
        })
        .get('/register', (req, res) => {
            return res.render('auth/register');
        })
        .post('/register', (req, res) => {
            controller.postRegister(req, res);
        })
        .get('/profile', login.ensureLoggedIn('/auth/log-in'), (req, res) => {
            controller.getProfile(req, res);
        })
        .put('/favourites',
        login.ensureLoggedIn('/auth/log-in'),
        (req, res) => {
            controller.postFavorites(req, res);
        })
        .delete('/favourites',
        login.ensureLoggedIn('/auth/log-in'),
        (req, res) => {
            controller.deleteFavorites(req, res);
        });

    app.use('/auth', router);
};

module.exports = attachRoutes;
