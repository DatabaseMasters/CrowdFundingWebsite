class Subscriber {
    get id() {
        return this._id;
    }

    static isValid(model) {
        // TODO validate
        return true;
    }

    static toViewModel(model) {
        const viewModel = new Subscriber();
        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });
        return viewModel;
    }
}

module.exports = Subscriber;
