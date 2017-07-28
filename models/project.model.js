class Project {
    get id() {
        return this._id;
    }

    static isValid(model) {
        return true;
    }

    static toViewModel(model) {
        const viewModel = new Project();
        Object.keys(model)
            .forEach((prop) => {
                console.log(prop);
                viewModel[prop] = model[prop];
            });
        return viewModel;
    }

    static fromViewModel(vewModel) {
        // not implemented
    }

    static _isTitleValid(title) {
        return title.match(/^[A-Za-z0-9_%.!?-]{0,120}$/g).length > 0;
    }

    static _isImageValid(img) {

    }

    static _isURLValid(ulr) {
    }

    static _isDateValid(date) {
        const now = new Date();
        return date >= now;
    }
}

module.exports = Project;
