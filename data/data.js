const UsersData = require('./users.data');
const ProjectsData = require('./projects.data');
const SubscribersData = require('./subscribers.data');
const FeedbackData = require('./feedbacks.data');

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        projects: new ProjectsData(db),
        subscribers: new SubscribersData(db),
        feedback: new FeedbackData(db),
    });
};

module.exports = { init };
