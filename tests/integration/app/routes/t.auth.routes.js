const superRequest = require('supertest');
const { expect } = require('chai');

describe('Auth routes tests', () => {
    const connectionString = 'mongodb://localhost/crowdfunding-db-test';
    let app = null;


    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../../../db').init(connectionString))
            .then((db) => require('../../../../data').init(db))
            .then((data) => require('../../../../app').init(data))
            .then((_app) => {
                app = _app;
            });
    });

    describe('Expect route', () => {
        it('get /log-in to return 200', (done) => {
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
        it('get /register to return 200', (done) => {
            superRequest(app)
                .get('/auth/register')
                .expect(200)
                .then((res) => {
                    console.log(res.req["path"]);
                    return done();
                })
                .catch((err) => {
                    return done(err);
                });
        });
        it('get /log-out to return 302 and redirect', (done) => {
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
    });
});
