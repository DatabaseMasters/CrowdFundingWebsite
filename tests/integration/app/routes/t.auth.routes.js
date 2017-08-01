const superRequest = require('supertest');
const { expect } = require('chai');

describe('Auth routes tests', () => {
    const connectionString = 'mongodb://localhost/crowdfunding-db-test';
    let app = null;
    const serv = superRequest.agent('http://localhost:3001');

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../../../db').init(connectionString))
            .then((db) => require('../../../../data').init(db))
            .then((data) => require('../../../../app').init(data))
            .then((_app) => {
                app = _app;
            });
    });

    afterEach(() => {
        // REVEIW how to drop database
    });

    describe('Expect route GET', () => {
        it('/auth/log-in to return 200', (done) => {
            superRequest(app)
                .get('/auth/log-in')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('/auth/register to return 200', (done) => {
            superRequest(app)
                .get('/auth/register')
                .expect(200)
                .then((res) => {
                    return done();
                })
                .catch((err) => {
                    return done(err);
                });
        });
        it('/auth/log-out to redirects with 302', (done) => {
            superRequest(app)
                .get('/auth/log-out')
                .expect(302)
                .expect('Location', '/')
                .then((res) => {
                    expect(res.header.location).to.be.equal('/');
                    return done();
                })
                .catch((err) => {
                    return done(err);
                });
        });
        it('/auth/profile redirects with 302 when no user logged', (done) => {
            superRequest(app)
                .get('/auth/profile')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('/auth/profile redirects with 302 when user is logged', (done) => {
            serv
                .get('/auth/profile')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('Expect route POST', () => {
        it('/auth/log-in authenticates user', (done) => {
            serv
                .post('/auth/log-in')
                .send({ user: 'testing', password: 'testing' })
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('/auth/register to redirect', (done) => {
            superRequest(app)
                .post('/auth/register')
                .send({ username: 'testing', password: 'testing', amount: '123' })
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });

    });
});
