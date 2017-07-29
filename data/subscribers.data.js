const BaseData = require('./base/base.data');
const Subscriber = require('../models/subscriber.model');

class SubscribersData extends BaseData {
    constructor(db) {
        super(db, Subscriber, Subscriber);
    }

    findByEmail(email) {
        return this.collection
            .findOne({ email: email })
            .then((subscriber) => {
                if (!subscriber) {
                    return null;
                }
                return subscriber;
            })
            .catch((err) => {
                console.log('Error getting subscriber email');
            });
    }
}

module.exports = SubscribersData;
