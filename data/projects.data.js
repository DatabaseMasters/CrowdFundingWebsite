const BaseData = require('./base/base.data');
const Project = require('../models/project.model');

class ProjectsData extends BaseData {
    constructor(db) {
        super(db, Project, Project);
    }

    _isModelValid(model) {
        // more validation
        return super._isModelValid(model);
    }
}

module.exports = ProjectsData;
