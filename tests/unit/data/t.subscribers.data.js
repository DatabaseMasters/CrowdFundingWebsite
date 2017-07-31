const { expect } = require('chai');
const sinon = require('sinon');
const SubscribersData = require('../../../data/subscribers.data.js');

describe('subscribers.data.js', () => {
    const db = {
        collection: () => { },
    };
    let data = null;
    let items = [];

    const findOne = (email) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].email === email.email) {
                return Promise.resolve(items[i]);
            }
        }
        return Promise.resolve(null);
    };

    describe('findByUsername', () => {
        beforeEach(() => {
            items = [
                { username: 'pesho', email: 'pesho@abv.bg' },
                { username: 'gosho', email: 'gosho@abv.bg' },
                { username: 'penka', email: 'penka@abv.bg' },
                { username: 'stefcho', email: 'stefcho@abv.bg' },
            ];
            // Mock what db.collection returns
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { findOne };
                });
            // Arrange
            data = new SubscribersData(db);
        });

        it('Expect to return correct user when is in collection', () => {
            // Act
            const expectedObject = { username: 'penka', email: 'penka@abv.bg' };
            return data.findByEmail('penka@abv.bg')
                .then((result) => {
                    // Assert
                    expect(result).to.deep.equal(expectedObject);
                });
        });

        it('Expect to return null when email is not in collection', () => {
            // Act
            return data.findByEmail('notInCollection@abv.bg')
                .then((result) => {
                    // Assert
                    expect(result).to.be.null;
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

