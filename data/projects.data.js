const BaseData = require('./base/base.data');
const Project = require('../models/project.model');

class ProjectsData extends BaseData {
    constructor(db) {
        super(db, Project, Project);
    }

    getNextProjectRef() {
        const collection = this.db.collection('projectCounter');
        const name = 'projectid';

        return collection.update({ _id: name }, { $inc: { seq: +1 } })
            .then(() => collection.findOne({ _id: name }))
            .then((item) => {
                return item.seq;
            });
    }

    donateToProject(projectRef, donation) {
        return this.collection.findOneAndUpdate(
            { 'ref': projectRef },
            { $inc: { donated: donation } }
        ).then((item) => {
            const project = item.value;
            project.donated += donation;
            return project;
        });
    }

    addUserToLiked(projectRef, username) {
        return this.collection.findOneAndUpdate(
            { 'ref': projectRef },
            { $addToSet: { likes: username } }
        );
    }

    removeUserFromLikes(projectRef, username) {
        return this.collection.findOneAndUpdate(
            { 'ref': projectRef },
            { $pull: { likes: username } }
        );
    }

    _isModelValid(model) {
        // more validation
        return super._isModelValid(model);
    }
}

module.exports = ProjectsData;
