class BaseData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    getAll(filter, options) {
        const defaultFilter = {};
        // filter format { category: value, }
        filter = filter || defaultFilter;
        // options format { limit: value } - not finished
        options = options || {};
        let result = this.collection
            .find(filter)
            .toArray();

        // Ensure the ModelClass has a toViewModel()
        // otherwise will throw errors
        if (this.ModelClass.toViewModel) {
            result = result.then((models) => {
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
        return this._isModelValid(model)
            .then((validity) => {
                console.log(validity);
                if (!validity.bool) {
                    return Promise.reject(validity.reason);
                }
                return Promise.resolve(validity);
            })
            .then(() => this.collection.insert(model))
            .then(() => this.ModelClass.toViewModel(model))
            .catch((err) => {
                console.log('base.data.js create method');
                throw err;
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
