class Project {
    static isValid(model) {
        console.log('Validating here');
        // data layer validation
        // not implemented
        // return typeof model === 'undefined';
        return true;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model, id) {
        const viewModel = new Project();
        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });
        return viewModel;
    }

    static fromViewModel(vewModel) {
        // not implemented
    }
}

module.exports = Project;
