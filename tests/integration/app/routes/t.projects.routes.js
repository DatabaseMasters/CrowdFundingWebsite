const superRequest = require('supertest');

describe('Projects routes tests', () => {
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

    describe('Expect GET route', () => {
        it('get / to return 200', (done) => {
            superRequest(app)
                .get('/projects')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('get /new to redirect with 302 if no user logged', (done) => {
            superRequest(app)
                .get('/projects/new')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('get /:id to redirect with 302 when wrong project passed', (done) => {
            superRequest(app)
                .get('/projects/88')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('Expect POST route', () => {
        it('post / to return 200 when no file passed', (done) => {
            superRequest(app)
                .post('/projects')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('post / to return 200 when file passed', (done) => {
            superRequest(app)
                .post('/projects')
                .send({ 'file': '1234' }) //
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
});
