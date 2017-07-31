const superRequest = require('supertest');

describe('Sever routes tests', () => {
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

    describe('GET routes', () => {
        it('expect / to return 200', (done) => {
            superRequest(app)
                .get('/')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect /about to return 200', (done) => {
            superRequest(app)
                .get('/about')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect /404 to return 200', (done) => {
            superRequest(app)
                .get('/404')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect /wrongURL to return 302', (done) => {
            superRequest(app)
                .get('/wrongURL')
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
