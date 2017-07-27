const passport = require('passport');
const { Strategy } = require('passport-local');
// const Strategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const MongoStore = require('connect-mongo')(session);
const dbConfig = require('./server.config');

const hashPass = (password) => {
    return '!' + password + '!';
};

const configAuth = (app, { users }) => {
    passport.use(new Strategy((username, password, done) => {
        users.findByUsername(username, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'No such user!' });
            }
            // TODO
            // add logic for hash password
            if (user.password !== password) {
                return done(null, false, { message: 'Wrong password!' });
            }
            return done(null, user);
        });
        // .then((user) => {
        //     if (!user) {
        //         return done('Invalid user', false, { message: 'Incorrect password.' });
        //     }

        //     if (hashPass(user.password) !== hashPass(password)) {
        //         return done(new Error('Invalid password'), false, { message: 'Incorrect password.' });
        //     }

        //     return done(null, user);
        // })
        // .catch((err) => {
        //     return done(err, false, { message: 'Incorrect password.' });
        // });
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
        users.findByUsername(username, (err, user) => {
            if (err) {
                return done(err);
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
