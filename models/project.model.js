class Project {
    static isValid(model) {
        // data layer validation
        // not implemented
        //return typeof model === 'undefined';
        return true;
    }

    get id() {
        return this._id;
    }

    // CHECK
    set id(id) {
        this.id = id;
    }

    static toViewModel(model) {
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
