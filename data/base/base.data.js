class BaseData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    getAll(filter) {
        const defaultFilter = {};
        filter = filter || defaultFilter;
        const options = {};
        const result = this.collection
            .find(filter, options)
            .toArray();

        // Ensure the ModelClass has a toViewModel()
        // otherwise will throw errors
        if (this.ModelClass.toViewModel) {
            result.then((models) => {
                return models
                    .map((model) => this.ModelClass
                        .toViewModel(model));
            })
                .catch((err) => {
                    console.log('base.data.js error');
                    console.log(err);
                });
        }

        return result;
    }

    // create method is called in server.router
    // model comes from req.body
    create(model) {
        // data layer validation
        if (!this._isModelValid(model)) {
            return Promise.reject('Invalid model');
        }
        // insert
        return this.collection.insert(model)
            .then(() => this.ModelClass.toViewModel(model))
            .catch((err) => {
                console.log('base.data.js create method');
                console.log(err);
            });
    }

    _isModelValid(model) {
        // calls validation method from *.model.js
        return this.validator.isValid(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseData;
