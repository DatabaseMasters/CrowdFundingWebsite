const { Router } = require('express');
const login = require('connect-ensure-login');
// TODO remove when database is working
// const projects = [{
//         id: 1,
//         name: 'Book: Climbing Injuries Solved',
//         description: 'A Book on Climbing-Focused Injury Prevention and Care.',
//         creator: 'Dr. Lisa Erikson DC',
//         coverImg: '/static/images/climber-sea.jpg',
//     },
//     {
//         id: 2,
//         name: 'OneFam - Preserve Your Family Story',
//         description: 'OneFam is a family social networking application which enables family members to create, share and preserve their family history.',
//         creator: 'Thomas O\'Donoghue',
//         coverImg: '/static/images/family-shadow-sea.jpg',
//     },
// ];

const attachRoutes = (app, data) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            return data.projects.getAll()
                .then((projects) => {
                    res.render('projects/projectsAll', {
                        model: projects,
                    });
                })
                .catch((err) => {
                    req.flash('error', err);
                });
        })
        // form can be shown dynamically 
        // as modal window with javascript - api.router?
        // TODO delete
        // .get('/form', (req, res) => {
        //     return res.render('projects/form');
        // })
        .get('/newproject', login.ensureLoggedIn('/auth/log-in'), (req, res) => {
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
            console.log(project);
            // create method is in base.data.js
            data.projects.create(project);
            return res
                .status(201)
                .redirect('/projects');
        });

    app.use('/projects', router);
};

module.exports = attachRoutes;
