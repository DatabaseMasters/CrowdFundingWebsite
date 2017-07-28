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
            const bodyUser = req.body;
            bodyUser.username = bodyUser.username.trim();
            bodyUser.password = bodyUser.password.trim();

            if (bodyUser.username === '' || bodyUser.password === '') {
                req.flash('error', 'Fill both input forms');
                res.redirect('/auth/register');
            }

            data.users.findByUsername(bodyUser.username, (err, user) => {
                if (user) {
                    req.flash('error', 'There is user with this username!');
                    res.redirect('/auth/register');
                } else {
                    bodyUser.password = bcrypt.hashSync(bodyUser.password, 10);

                    data.users.create(bodyUser)
                        .then((insertedUser) => {
                            req.login(insertedUser, (err) => {
                                if(err){
                                    res.redirect('/auth/register');
                                }
                                res.redirect('/');
                            });
                        })
                        .catch(err);
                }
            });
        })
        .get('/profile', login.ensureLoggedIn('/auth/log-in'), (req, res) => {
            res.render('auth/profile');
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
