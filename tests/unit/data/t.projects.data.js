const { expect } = require('chai');
const sinon = require('sinon');
const ProjectsData = require('../../../data/projects.data.js');

describe('projects.data.js', () => {
    const db = {
        collection: () => { },
    };
    let data = null;
    let items = [];

    const findOneAndUpdate = (projectRef, donation) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].ref === projectRef.ref) {
                return Promise.resolve({ value: items[i] });
            }
        }
        return Promise.resolve(null);
    };

    describe('donateToProject', () => {
        beforeEach(() => {
            items = [
                { ref: 1, donated: 10 },
                { ref: 2, donated: 10 },
                { ref: 3, donated: 10 },
                { ref: 4, donated: 10 },
            ];
            // Mock what db.collection returns
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { findOneAndUpdate };
                });
            // Arrange
            data = new ProjectsData(db);
        });

        it('Expect to increment donations to project', () => {
            // Act
            const expectedObject = { ref: 1, donated: 17 };
            return data.donateToProject(1, 7)
                .then((result) => {
                    // Assert
                    expect(result).to.deep.equal(expectedObject);
                });
        });

        afterEach(() => {
            // Restore db.collection, otherwise we're trying to
            // stub it multiple times and throws
            // Error: attempted to wrap collection which is already wrapped
            db.collection.restore();
        });
    });
});

