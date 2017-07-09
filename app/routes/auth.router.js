const { Router } = require('express');
const passport = require('passport');

const attachRoutes = (app) => {
    const router = new Router();

    router
        .get('/sign-in', (req, res) => {
            return res.render('auth/sign-in');
        })
        .post('/sign-in',
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/auth/sign-in',
                failureFlash: true,
            })
        )
        .get('/sign-out', (req, res) => {
            req.logout();
            res.redirect('/');
        });

    app.use('/auth', router);
};

module.exports = attachRoutes;
