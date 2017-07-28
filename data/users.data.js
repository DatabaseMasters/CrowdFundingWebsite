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
            })
            .catch((err) => {
                console.log('Error in users.data.js -> checkPassword! Error message:');
                console.log(err);
                console.log('--- End error message ---');
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
                return user;
            })
            .catch((err) => {
                console.log('Error in users.data.js -> findById! Error message:');
                console.log(err);
                console.log('--- End error message ---');
            });
    }

    // REVIEW: This is a demo method, test, modify as needed        
    findByUsername(username) {
        return this.collection
            .findOne({ username: username })
            .then((user) => {
                if (!user) {
                    return null;
                }
                return user;
            })
            .catch();
    }

    _isModelValid(model) {
        // TODO: add more validation, specific to user
        // then call base method
        return super._isModelValid(model);
    }
}

module.exports = UsersData;
