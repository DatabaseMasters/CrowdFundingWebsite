const { Router } = require('express');

const attachRoutes = (app, data) => {
    const router = new Router();

    router
    // REVIEW: This is a demo method, modify as needed
        .get('/:id', (req, res) => {
            const id = parseInt(req.params.id, 10);
            const project = data.projects.find((i) => i.id === id);
            if (!project) {
                return res.status(404)
                    .send({
                        error: 'Not found',
                    });
            }
            return res.send(project);
        })
        .get('/', (req, res) => {
            let { category, filter } = req.query;
            //filter = filter || {};
            // TODO add filter by newest, popular, most funded
            // check if request contains a category, assign empty object if not
            category = category ? { category: category } : {};

            data.projects.getAll(category)
                .then((projects) => {
                    if (projects.length === 0) {
                        res.send('<h3>No projects in category ' + category.category.charAt(0).toUpperCase() + category.category.slice(1) + '</h3>');
                    } else {
                        res.render('projects/projectsContainer', { model: projects },
                            (err, html) => {
                                res.send(html);
                            });
                    }
                })
                .catch((err) => {
                    console.log('--- ERROR in api.router.js getAll --- ' + err);
                });
        })
        // Pagination
        // .get('/', (req, res) => {
        //     let { q, page, size } = req.query;
        //     page = parseInt(page, 10) || 1;
        //     size = parseInt(size, 10) || 10;

    //     let result = data.projects;
    //     if (q) {
    //         q = q.toLowerCase();
    //         result = data.projects.filter((project) => {
    //             return project.name.toLocaleLowerCase().includes(q);
    //         });
    //     }
    //     result = result.slice((page - 1) * size, page * size);
    //     res.send(result);
    // })
    // test with Postaman

    // REVIEW: This is a demo method, modify as needed
    .post('/', (req, res) => {
        const project = req.body;
        project.id = data.projects.length + 1;
        // hash password
        data.projects.push(project);
        res.status(201)
            .send(project);
    });

    app.use('/api/projects', router);
};

module.exports = attachRoutes;
