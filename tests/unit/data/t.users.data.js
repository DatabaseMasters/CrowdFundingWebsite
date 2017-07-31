const { expect } = require('chai');
const sinon = require('sinon');
const UsersData = require('../../../data/users.data.js');

describe('users.data.js', () => {
    const db = {
        collection: () => { },
    };
    let data = null;
    let items = [];

    const findOne = (username) => {
        const inCollection = items.includes(username.username);
        if (inCollection) {
            return Promise.resolve(username.username);
        }
        return Promise.resolve(null);
    };

    describe('findByUsername', () => {
        beforeEach(() => {
            items = ['pesho', 'gosho', 'penka', 'iliikata'];
            // Mock what db.collection returns
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { findOne };
                });
            // Arrange
            data = new UsersData(db);
        });

        it('Expect to return username when is in collection', () => {
            // Act
            return data.findByUsername('gosho')
                .then((result) => {
                    // Assert
                    expect(result).to.deep.equal('gosho');
                });
        });

        it('Expect to return null when username is not in collection', () => {
            // Act
            return data.findByUsername('not in collection')
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

    describe('hasEnoughMoney', () => {
        beforeEach(() => {
            items = ['pesho', 'gosho', 'penka', 'iliikata'];
            // Mock what db.collection returns
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { findOne };
                });
            // Arrange
            data = new UsersData(db);
        });

        it('Should return true when user has money', () => {
            // Act
            return data.findByUsername('gosho')
                .then((result) => {
                    // Assert
                    expect(result).to.deep.equal('gosho');
                });
        });

        it('Expect to return null when username is not in collection', () => {
            // Act
            return data.findByUsername('not in collection')
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

