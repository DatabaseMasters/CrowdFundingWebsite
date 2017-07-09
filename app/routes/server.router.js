const { Router } = require('express');

const projects = [{
        id: 1,
        name: 'Book: Climbing Injuries Solved',
        description: 'A Book on Climbing-Focused Injury Prevention and Care.',
        creator: 'Dr. Lisa Erikson DC',
        coverImg: '/static/images/climber-sea.jpg',
    },
    {
        id: 2,
        name: 'OneFam - Preserve Your Family Story',
        description: 'OneFam is a family social networking application which enables family members to create, share and preserve their family history.',
        creator: 'Thomas O\'Donoghue',
        coverImg: '/static/images/family-shadow-sea.jpg',
    },
];

const attachRoutes = (app) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            console.log('---- ex ALL ----');
            res.render('items/all', {
                model: projects,
            });
        })
        // form can be shown dynamically 
        // as modal window with javascript - api.router?
        .get('/form', (req, res) => {
            return res.render('items/form');
        })
        .get('/:id', (req, res) => {
            const id = parseInt(req.params.id, 10);
            const project = projects.find((i) => i.id === id);
            if (!project) {
                // here we can use redirect
                // because we're not doing ajax
                console.log('----- WRONG ID -----');
                return res.redirect('/404');
            }
            return res.render('items/details', {
                model: project,
            });
        })
        .post('/', (req, res) => {
            const item = req.body;
            console.log(item);
            item.id = projects.length + 1;
            // hash password
            projects.push(item);
            return res
                .status(201)
                .redirect('/items');
        });

    app.use('/items', router);
};

module.exports = attachRoutes;
