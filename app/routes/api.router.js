const { Router } = require('express');
const login = require('connect-ensure-login');

const attachRoutes = (app, data) => {
    const router = new Router();

    router
        // REVIEW: This is a demo method, modify as needed
        // .get('/:id', (req, res) => {
        //     const id = parseInt(req.params.id, 10);
        //     const project = data.projects.find((i) => i.id === id);
        //     if (!project) {
        //         return res.status(404)
        //             .send({
        //                 error: 'Not found',
        //             });
        //     }
        //     return res.send(project);
        // })
        .get('/projects/search', (req, res) => {
            let searchValue = req.query.searchValue;
            const filter = {
                $or: [{ 'name': { '$regex': searchValue, '$options': 'i' } },
                { 'description': { '$regex': searchValue, '$options': 'i' } },
                ],
            };
            data.projects.getAll(filter)
                .then((projects) => {
                    if (projects.length < 1) {
                        searchValue = `No results found for "${searchValue}"`;
                    }
                    res.render('projects/search', {
                        model: {
                            value: `${searchValue}`,
                            projects: projects,
                        },
                    },
                        (err, html) => {
                            res.send(html);
                        });
                });
        })
        .get('/projects', (req, res) => {
            let { category, page } = req.query;
            // TODO add filter/options by newest, popular, most funded
            // REVIEW remove page parsing?
            page = parseInt(page, 10) || 1;
            const size = 8;

            // Checks if request contains a category, assign empty object if not
            category = category ? { category: category } : {};

            data.projects.getAll(category)
                .then((projects) => {
                    if (projects.length < 1) {
                        res.send('<h3>No projects in category ' + category.category.charAt(0).toUpperCase() + category.category.slice(1) + '</h3>');
                    } else {
                        // TODO: consider limiting the number of projects returned from db
                        projects = projects.slice((page - 1) * size, page * size);
                        res.render('projects/projects', { model: projects },
                            (err, html) => {
                                res.send(html);
                            });
                    }
                })
                .catch((err) => {
                    console.log('--- ERROR in api.router.js getAll --- ' + err);
                });
        })
        .put('/users/profile/:username',
        login.ensureLoggedIn('/auth/log-in'),
        (req, res) => {
            const username = req.params.username;
            console.log(new Date().toLocaleTimeString());
            let obj = {};
            
            if (req.body.amount) {
                obj = {
                    'amount': req.body.amount,
                };
            } else {
                obj = {
                    'firstName': req.body.firstName.trim(),
                    'lastName': req.body.lastName.trim(),
                    'email': req.body.email.trim(),
                };
            }

            data.users.updateProfile(username, obj)
                .then((result) => {
                    if (!result.value) {
                        req.flash('error', 'Failed to update profile..');
                    } else {
                        req.flash('info', 'Succesfuly updated!');
                    }
                    res.locals.messages = req.flash();
                    return res.render('flash_message_template');
                })
                .catch(() => {
                    req.flash('error', 'Something happened');
                    res.locals.messages = req.flash();
                    return res.render('flash_message_template');
                });
        })
        .post('/subscribe', (req, res) => {
            const email = req.body.email;
            data.subscribers.findByEmail(email)
                .then((subscriber) => {
                    if (subscriber) {
                        return res
                            //.status(418)
                            .send({ message: 'Email already registered' });
                    }

                    const newSubscriber = {
                        email: email,
                        name: '',
                    };
                    data.subscribers
                        .create(newSubscriber)
                        .then(() => {
                            return res
                                //.status(201)
                                .send({ message: 'Thank you for subscribing' });
                        })
                        .catch((err) => {
                            return res.send({ message: 'Invalid email format' });
                        });
                });
        });
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
    // .post('/', (req, res) => {
    //     const project = req.body;
    //     project.id = data.projects.length + 1;
    //     // hash password
    //     data.projects.push(project);
    //     res.status(201)
    //         .send(project);
    // });

    app.use('/api', router);
};

module.exports = attachRoutes;
