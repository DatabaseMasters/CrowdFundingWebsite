const fs = require('fs');
const path = require('path');

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

    moveCoverPicture(folder, filename, username) {
        const oldPath = path.join('./', folder, filename);
        const newFolder = path.join('./', folder, username);
        const newPath = path.join(newFolder, filename);
        console.log(oldPath);
        if (!fs.existsSync(newFolder)) {
            fs.mkdirSync(newFolder);
        }

        fs.renameSync(oldPath, newPath, (err) => {
            if (err) {
                console.log('Could not move the file: ' + oldPath +
                    ' to ' + newPath + ' Error: ' + err);
            }
        });

        return '/' + newPath;
    }

    _isModelValid(model) {
        // more validation
        return super._isModelValid(model);
    }
}

module.exports = ProjectsData;
