const passport = require('passport');
const { Strategy } = require('passport-local');
// const Strategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const MongoStore = require('connect-mongo')(session);
const dbConfig = require('./server.config');

const bcrypt = require('bcryptjs');

const configAuth = (app, { users }) => {
    passport.use(new Strategy((username, password, done) => {
        users.findByUsername(username)
            .then((user) => {
                if (!user) {
                    return done(null, false, { message: 'No such user!' });
                }
                return bcrypt.compare(password, user.password)
                    .then((obj) => {
                        if (obj) {
                            return done(null, user);
                        }
                        return done(null, false, {
                            message: 'Wrong password!',
                        });
                    })
                    .catch((err) => {
                        return done(err, false, {
                            message: 'Something went wrong.',
                        });
                    });
            });
    }));

    app.use(cookieParser());
    // set up key storing
    app.use(session({
        store: new MongoStore({ url: dbConfig.connectionString }),
        secret: dbConfig.sessionSecret,
        resave: true,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser((username, done) => {
        users.findByUsername(username)
            .then((user) => {
                if (!user) {
                    return done(null);
                }
                return done(null, user);
            });
    });

    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        res.locals.user = req.user;
        next();
    });
};

module.exports = { configAuth };
