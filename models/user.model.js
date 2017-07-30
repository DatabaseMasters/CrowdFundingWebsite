// Review: Should models be in data folder?
class User {
    static isValid(model) {
        // data layer validation
        return Promise.resolve({
            bool: (typeof model !== 'undefined' &&
            typeof model.password === 'string' &&
            model.password.length >= 5 &&
            typeof model.username === 'string' &&
            model.username.length >= 5), reason: 'Reason',
        });
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
