const { Router } = require('express');
const login = require('connect-ensure-login');
const { init } = require('./controller');

const attachRoutes = (app, data) => {
    const router = new Router();
    const controller = init(data);

    router
        .get('/projects/search', (req, res) => {
            controller.getSearch(req, res);
        })
        .get('/projects', (req, res) => {
            controller.getProjects(req, res);
        })
        .put('/users/profile/:username',
            login.ensureLoggedIn('/auth/log-in'),
            (req, res) => {
                controller.updateUser(req, res);
            })
        .post('/subscribe', (req, res) => {
            controller.postSubscribe(req, res);
        })
        .post('/feedback', (req, res) => {
            controller.postFeedback(req, res);
        })
        .post('/donate', (req, res) => {
            controller.postDonation(req, res);
        });
    app.use('/api', router);
};

module.exports = attachRoutes;
