class Feedback {
    static isValid(model) {
        // TODO validation
        return Promise.resolve({ bool: true });
    }

    static toViewModel(model) {
        const viewModel = new Feedback();
        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });
        return viewModel;
    }

    static fromViewModel(viewModel) {
        // REVIEW use this to create dbModel from viewModel?
    }
}

module.exports = Feedback;
