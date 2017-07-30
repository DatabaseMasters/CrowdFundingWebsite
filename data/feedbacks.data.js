const BaseData = require('./base/base.data');
const Feedback = require('../models/feedback.model.js');

class FeedbackData extends BaseData {
    constructor(db) {
        super(db, Feedback, Feedback);
    }

    // REVIEW anything else here?
}

module.exports = FeedbackData;
