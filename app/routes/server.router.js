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
        // TODO: remove this method? the /:id gets the project
        .get('/project', (req, res) => {
            console.log('--- IN THE WRONG ROUTE --- ');
            return res.render('projects/details');
        })
        .get('/:id', (req, res) => {
            console.log('--- IN THE RIGHT ROUTE ---');
            const id = parseInt(req.params.id, 10);
            data.projects.getAll({ id: id })
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
                    req.flash('--- Error in server.router.js ---', err);
                });
        })
        .post('/', (req, res) => {
            const project = req.body;
            data.projects.getNextProjectRef()
                .then((ref) => {
                    project.ref = ref;
                    return project;
                }).then((proj) => {
                    data.projects.create(proj);
                    return res
                        .status(201)
                        .redirect('/projects#category/');
                })
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
