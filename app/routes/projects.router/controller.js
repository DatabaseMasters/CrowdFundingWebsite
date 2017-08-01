const init = (data) => {
    const controller = {
        getProject(req, res) {
            const id = parseInt(req.params.id, 10);
            return data.projects.getAll({ ref: id })
                .then((projects) => {
                    if (!projects || projects.length < 1) {
                        // TODO remove
                        console.log('----- WRONG PROJECT ID -----');
                        return res.redirect('/404');
                    }
                    return res.render('projects/details', {
                        model: projects[0],
                    });
                })
                .catch((err) => {
                    // REVIEW Check if this flash works!
                    req.flash('error', err);
                });
        },
        postProject(req, res) {
            const project = req.body;
            const file = req.file;

            if (!file) {
                res.render('projects/new', { model: project });
                return Promise.resolve(res);
            }

            project.username = req.user.username;
            project.coverImg = '/' + file.path;
            project.donated = 0;

            return data.projects.getNextProjectRef()
                .then((ref) => {
                    project.ref = ref;
                    return project;
                })
                .then((proj) => data.projects.create(proj))
                .then((proj) => {
                    return res.status(201).redirect('/projects/' + proj.ref);
                })
                .catch((er) => {
                    req.flash('error', er);
                    return res.render('projects/new', { model: project });
                });
        },
    };

    return controller;
};

module.exports = { init };
