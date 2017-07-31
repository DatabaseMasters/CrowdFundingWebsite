const init = (data) => {
    const controller = {
        getAll(req, res) {
            const id = parseInt(req.params.id, 10);
            return data.projects.getAll({ ref: id })
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
        },
    };

    return controller;
};

module.exports = { init };
