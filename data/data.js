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

// TODO: Code from demo1, left for reference
// remove when app architecture is complete

// const usersList = [{
//     id: 1,
//     username: 'Cuki',
//     password: 'MRAZQ_WIND0W$!',
// }];

// const users = {
//     findById(id) {
//         id = parseInt(id, 10);
//         const user =
//             usersList.find((u) => u.id === id);
//         return new Promise((resolve, reject) => {
//             if (!user) {
//                 return reject('No such id');
//             }
//             return resolve(user);
//         });
//     },
//     findByUsername(username) {
//         const user =
//             usersList.find((u) =>
//                 u.username.toLowerCase() === username.toLowerCase());
//         // make the request async
//         // to be able to transition to db easier
//         return new Promise((resolve, reject) => {
//             if (!user) {
//                 return reject('No such user');
//             }
//             return resolve(user);
//         });
//     },
// };
