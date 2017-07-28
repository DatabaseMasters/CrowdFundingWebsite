const { Router } = require('express');
const login = require('connect-ensure-login');

const attachRoutes = (app, data) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            res.render('projects/projectsAll');
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
        .get('/project', (req, res) => {
            return res.render('projects/project');
        })
        .get('/:id', (req, res) => {
            const id = parseInt(req.params.id, 10);
            data.projects.getAll({ id: id })
                .then((projects) => {
                    if (!projects) {
                        // here we can use redirect
                        // because we're not doing ajax
                        console.log('----- WRONG ID -----');
                        return res.redirect('/404');
                    }
                    return res.render('projects/project', {
                        model: projects[0],
                    });
                })
                .catch((err) => {
                    req.flash('error', err);
                });
        })
        .post('/', (req, res) => {
            const project = req.body;
            data.projects.getNextProjectRef().then((ref) => {
                    project.ref = ref;
                    return project;
                }).then((proj) => {
                    data.projects.create(proj);
                    return res
                        .status(201)
                        .redirect('/projects');
                })
                .catch((er) => {
                    console.log('error in server.router.js post projects/' + er);
                    return res
                        .status(500)
                        .redirect('/projects');
                });
        });

    app.use('/projects', router);
};

module.exports = attachRoutes;
