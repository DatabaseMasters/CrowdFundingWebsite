const init = (data) => {
    const controller = {
        getSearch(req, res) {
            let searchValue = req.query.searchValue;
            const filter = {
                $or: [
                    {
                        'name': {
                            '$regex': searchValue,
                            '$options': 'i',
                        },
                    },
                    {
                        'description': {
                            '$regex': searchValue,
                            '$options': 'i',
                        },
                    },
                ],
            };
            return data.projects.getAll(filter)
                .then((projects) => {
                    if (projects.length < 1) {
                        searchValue = `No results found for "${searchValue}"`;
                    }
                    return res.render('projects/search', {
                        model: {
                            value: `${searchValue}`,
                            projects: projects,
                        },
                    },
                        (err, html) => {
                            res.send(html);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getProjects(req, res) {
            let { category, page } = req.query;
            page = parseInt(page, 10) || 1;
            const size = 8;

            category = category ? { category: category } : {};

            return data.projects.getAll(category)
                .then((projects) => {
                    if (projects.length < 1) {
                        const fPart = '<h3>No projects in category ' +
                            '<span class="capitalize">';
                        const sPart = '</span></h3>';
                        return res.send(fPart + category.category + sPart);
                    }
                    const one = (page - 1) * size;
                    const two = page * size;
                    projects = projects.slice(one, two);
                    return res.render('projects/projects',
                        { model: projects },
                        (err, html) => {
                            res.send(html);
                        });
                })
                .catch((err) => {
                    console.log('--- ERROR in api.router.js getAll --- ');
                    console.log(err);
                });
        },
        updateUser(req, res) {
            const username = req.params.username;
            console.log(new Date().toLocaleTimeString());
            let obj = {};
            if (req.body.amount < 0) {
                req.flash('error', 'Amount should be between 0 and 10 000!');
                res.locals.messages = req.flash();
                return res.render('flash_message_template');
            }

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

            return data.users.updateProfile(username, obj)
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
        },
        postSubscribe(req, res) {
            const email = req.body.email;
            return data.subscribers.findByEmail(email)
                .then((subscriber) => {
                    if (subscriber) {
                        return res
                            .send({ message: 'Email already registered' });
                    }

                    const newSubscriber = {
                        email: email,
                        name: '',
                    };
                    return data.subscribers
                        .create(newSubscriber)
                        .then(() => {
                            return res
                                .send({ message: 'Thank you for subscribing' });
                        })
                        .catch((err) => {
                            const msg = 'Invalid email format';
                            return res.send({ message: msg });
                        });
                });
        },
        postFeedback(req, res) {
            return data.feedback
                .create(req.body)
                .then((result) => {
                    req.flash('info', 'Thank you for your feedback');
                    res.locals.messages = req.flash();

                    return res.render('flash_message_template');
                })
                .catch((err) => {
                    req.flash('error', 'Error sending feedback');
                    res.locals.messages = req.flash();

                    return res.render('flash_message_template');
                });
        },
        postDonation(req, res) {
            const user = req.user;
            if (!user) {
                const msg = 'You need to be logged to donate!';
                req.flash('info', msg);
                const redirect = {};
                redirect.message = msg;
                redirect.redirect = true;
                redirect.redirecturl = '/auth/log-in';
                return res.send(redirect);
            }

            const project = req.body.project;
            const donation = parseInt(req.body.donation, 10);

            return data.projects.donateToProject(project, donation)
                .then((proj) => {
                    if (!proj) {
                        return res.send({ message: 'Invalid project ref' });
                    }

                    data.users.addToDonated(user.username, [project])
                        .catch((er) => console.log(er));

                    const response = {};
                    response.message = 'You successfully donated ' +
                        `$${donation} to` + `'${proj.title}'. Thank you!`;
                    response.updatedAmount = proj.donated;
                    response.total = proj.amount;

                    return res.send(response);
                })

                .catch((err) => {
                    console.log('--- ERROR in api.router.js donate --- ' + err);
                });
        },
    };

    return controller;
};

module.exports = { init };
