const passport = require('passport');
const { Strategy } = require('passport-local');
// const Strategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const hashPass = (password) => {
    return '!' + password + '!';
};

const configAuth = (app, { users }) => {
    passport.use(new Strategy(
        (username, password, done) => {
            return users.findByUsername(username)
                .then((user) => {
                    if (hashPass(user.password) !== hashPass(password)) {
                        done(new Error('Invalid password'));
                    }
                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });
        }
    ));

    app.use(cookieParser());
    // set up key storing
    app.use(session({ secret: 'Purple unicorn' }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        return users.findById(id)
            .then((user) => {
                done(null, user);
            })
            // here we can pass directly done
            // in the above function it wasn't possible
            // but why?
            // here "it will catch if there is an error"
            .catch(done);
    });
};

module.exports = configAuth;
