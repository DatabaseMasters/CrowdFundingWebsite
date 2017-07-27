const { Router } = require('express');
const passport = require('passport');

const attachRoutes = (app, data) => {
    const router = new Router();

    router
        .get('/log-in', (req, res) => {
            return res.render('auth/log-in');
        })
        .post('/log-in',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/log-in',
            failureFlash: true,
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
            const bodyUser = req.body;

            data.users.findByUsername(bodyUser.username)
                .then((dbUser) => {
                    if (dbUser) {
                        throw new Error('User already exists');
                    }

                    return data.users.create(bodyUser);
                })
                .then((dbUser) => {
                    return res.redirect('/auth/log-in');
                })
                .catch((err) => {
                    req.flash('error', err);
                });
        });

    app.use('/auth', router);
};

module.exports = attachRoutes;
