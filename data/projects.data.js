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
                console.log(item);
                console.log(item.seq);
                return item.seq;
            });
    }

    _isModelValid(model) {
        // more validation
        return super._isModelValid(model);
    }
}

module.exports = ProjectsData;
