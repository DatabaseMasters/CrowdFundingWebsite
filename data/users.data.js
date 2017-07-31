const BaseData = require('./base/base.data');
const User = require('../models/user.model');

class UsersData extends BaseData {
    constructor(db) {
        /* Second User param passed as validator, see BaseData*/
        super(db, User, User);
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
            });
    }

    // Finds user by username and updates it's projects. Projects must be an array!
    addFavourites(username, projects) {
        return this.collection.update(
            { 'username': username },
            {
                $addToSet: {
                    'favourites': {
                        $each: projects,
                    },
                },
            }
        );
    }

    addToDonated(username, projects) {
        return this.collection.update(
            { 'username': username },
            {
                $addToSet: {
                    'donated': {
                        $each: projects,
                    },
                },
            }
        );
    }

    removeFavourites(username, projects) {
        return this.collection.update(
            { 'username': username },
            {
                $pull: {
                    'favourites': {
                        $in: projects,
                    },
                },
            }
        );
    }

    updateProfile(username, options) {
        return this.collection.findOneAndUpdate(
            { 'username': username.trim() },
            {
                $set: options,
            }
        );
    }

    getFavouriteProjects(username) {
        return this.collection.find(
            { 'username': username },
            {
                'favourites': 1,
                '_id': 0,
            }
        ).toArray();
    }

    hasEnoughMoney(username, amountToCheck) {
        return this.collection.findOne(
            { 'username': username },
            {
                'amount': 1,
                '_id': 0,
            }
        ).then((currentAmount) => {
            return amountToCheck <= currentAmount.amount;
        });
    }

    getDonatedProjects(username) {
        return this.collection.find(
            { 'username': username },
            {
                'donated': 1,
                '_id': 0,
            }
        ).toArray();
    }

    _isModelValid(model) {
        // TODO: add more validation, specific to user
        // then call base method
        return super._isModelValid(model);
    }
}

module.exports = UsersData;
