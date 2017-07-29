const { Router } = require('express');
const login = require('connect-ensure-login');

const attachRoutes = (app, data) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            res.render('projects/explore');
        })
        // form can be shown dynamically
        // as modal window with javascript - api.router?
        // TODO delete
        // .get('/form', (req, res) => {
        //     return res.render('projects/form');
        // })
        .get('/new', login.ensureLoggedIn('/auth/log-in'), (req, res) => {
            return res.render('projects/new');
        })
        .get('/:id', (req, res) => {
            const id = parseInt(req.params.id, 10);
            data.projects.getAll({ ref: id })
                .then((projects) => {
                    if (!projects || projects.length < 1) {
                        console.log('----- WRONG PROJECT ID -----');
                        return res.redirect('/404');
                    }
                    return res.render('projects/details', {
                        model: projects[0],
                    });
                })
                .catch((err) => {
                    // Check if this flash works!
                    req.flash('error', err);
                });
        })
        .post('/', (req, res) => {
            const project = req.body;
            const file = req.file;

            project.user = req.user.username;
            project.coverImg = '/' + file.path;

            data.projects.getNextProjectRef()
                .then((ref) => {
                    project.ref = ref;
                    return project;
                })
                .then((proj) => data.projects.create(proj))
                .then((proj) => res.status(201).redirect('/projects/' + proj.ref))
                .catch((er) => {
                    console.log('--- Error in server.router.js post projects/ ---' + er);
                    return res
                        .status(500)
                        .redirect('/projects#category/');
                });
        });

    app.use('/projects', router);
};

module.exports = attachRoutes;
