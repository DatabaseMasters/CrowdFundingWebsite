const { Router } = require('express');
const passport = require('passport');
const login = require('connect-ensure-login');
const bcrypt = require('bcryptjs');

const attachRoutes = (app, data) => {
    const router = new Router();

    router
        .get('/log-in', (req, res) => {
            return res.render('auth/log-in');
        })
        // .post('/log-in',
        // passport.authenticate('local', {
        //     successReturnToOrRedirect: '/',
        //     failureRedirect: '/auth/log-in',
        //     failureFlash: true,
        //     successFlash: 'Welcome!',
        // })
        // )
        .post('/log-in', (req, res, next) => {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.redirect('/auth/log-in');
                }
                req.logIn(user, (error) => {
                    if (err) {
                        return next(error);
                    }
                    res.cookie('username', user.username);
                    return res.redirect('/');
                });
            })(req, res, next);
        })
        .get('/log-out', (req, res) => {
            req.logout();
            res.redirect('/');
        })
        .get('/register', (req, res) => {
            return res.render('auth/register');
        })
        .post('/register', (req, res) => {
            const bodyUser = req.body;
            bodyUser.username = bodyUser.username.trim();
            bodyUser.password = bodyUser.password.trim();

            if (bodyUser.username === '' || bodyUser.password === '') {
                req.flash('error', 'Fill both input forms');
                res.redirect('/auth/register');
            }

            data.users.findByUsername(bodyUser.username)
                .then((user) => {
                    if (user) {
                        req.flash('error', 'There is user with this username!');
                        res.redirect('/auth/register');
                    } else {
                        bodyUser.password = bcrypt.hashSync(bodyUser.password, 10);
                        return data.users.create(bodyUser);
                    }
                })
                .then((insertedUser) => {
                    req.login(insertedUser, (err) => {
                        if (err) {
                            res.redirect('/auth/register');
                        }
                        res.redirect('/');
                    });
                });

        })
        .get('/profile', login.ensureLoggedIn('/auth/log-in'), (req, res) => {
            res.render('users/profile');
        })
        .post('/update-profile', login.ensureLoggedIn('/auth/log-in'), (req, res) => {
            // data.users.findByUsername(bodyUser.username, (err, user) => {
            //     if(user){

            //     }
            // });
        });

    app.use('/auth', router);
};

module.exports = attachRoutes;
