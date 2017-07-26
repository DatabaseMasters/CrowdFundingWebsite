const BaseData = require('./base/base.data');
const User = require('../models/user.model');

class UsersData extends BaseData {
    constructor(db) {
        /* Second User param passed as validator, see BaseData*/
        super(db, User, User);
    }

    // REVIEW: This is a demo2 method, modify as needed
    checkPassword(username, password) {
        return this.collection
            .findOne({ username })
            .then((user) => {
                // findOne returns null if username not found
                if (!user) {
                    throw new Error('Invalid user');
                }
                if (user.password !== password) {
                    throw new Error('Invalid password');
                }

                return true;
            });
    }

    // REVIEW: This is a demo method, test, modify as needed    
    findById(id) {
        return this.collection
            .findOne({ id })
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid id');
                }
            });
    }

    // REVIEW: This is a demo method, test, modify as needed        
    findByUsername(username) {
        return this.collection
            .findOne({ username });
            // .then((user) => {
            //     return user;
            // });
    }

    _isModelValid(model) {
        // TODO: add more validation, specific to user
        // then call base method
        return super._isModelValid(model);
    }
}

module.exports = UsersData;
