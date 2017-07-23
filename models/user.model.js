// Review: Should models be in data folder?
class User {
    static isValid(model) {
        // data layer validation
        // TODO: Understand where text property comes from
        return typeof model !== 'undefined' &&
            typeof model.text === 'string' &&
            model.text > 3;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new User();
        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });
        return viewModel;
    }

    static fromViewModel(viewModel) {
        // not implemented
    }
}

module.exports = User;
