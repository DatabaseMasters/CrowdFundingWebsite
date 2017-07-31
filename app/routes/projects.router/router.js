const { Router } = require('express');
const login = require('connect-ensure-login');

const attachRoutes = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/', (req, res) => {
            return res.render('projects/explore');
        })
        .get('/new', login.ensureLoggedIn('/auth/log-in'), (req, res) => {
            return res.render('projects/new', { model: null });
        })
        .get('/:id', (req, res) => {
            return controller.getProject(req, res);
        })
        .post('/', (req, res) => {
            return controller.postProject(req, res);
        });

    app.use('/projects', router);
};

module.exports = attachRoutes;
