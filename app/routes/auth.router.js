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
            const bodyUser = req.body;

            if (bodyUser.username === '' || bodyUser.password === '') {
                req.flash('error', 'Fill both input forms');
                res.redirect('/auth/register');
            }

            data.users.findByUsername(bodyUser.username, (err, user) => {
                if (user) {
                    req.flash('error', 'There is user with this username!');
                    res.redirect('/auth/register');
                } else {
                    data.users.create(bodyUser);
                    req.flash('Success!');
                    res.redirect('/auth/log-in');
                }
            });
        });

    app.use('/auth', router);
};

module.exports = attachRoutes;
