const { expect } = require('chai');
const sinon = require('sinon');
const BaseData = require('../../../data/base/base.data.js');

// Patial settings to run mocha in browser - mocha.html file
// doesn't work with modules well
// mocha.setup('bdd');
// const expect = chai.expect;
// // const sinon = sinon;
// // const BaseData = BaseData;

describe('BaseData.getAll()', () => {
    const db = {
        collection: () => {},
    };
    let ModelClass = null;
    const validator = null;
    let data = null;

    let items = [];
    const toArray = () => {
        return Promise.resolve(items);
    };
    const find = () => {
        return {
            toArray,
        };
    };

    describe('When there are items in db', () => {
        beforeEach(() => {
            items = [1, 2, 3, 4];
            // Mock what db.collection returns
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { find };
                });
            ModelClass = class {};
            // Arrange
            data = new BaseData(db, ModelClass, validator);
            // Another option ot mock the db without declaring external constants
            // sinon.stub(db, 'collection')
            //     .callsFake(() => {
            //         return {
            //             find: () => {
            //                 return {
            //                     toArray: () => {
            //                         return Promise.resolve(items);
            //                     },
            //                 };
            //             },
            //         };
            //     });

            // Mock inline class
            //ModelClass = class {};
            // validator not needed here, will be needed probably when testing create()
            // validator = {
            //     isValid: () => true,
            // };
        });

        afterEach(() => {
            // Restore db.collection, otherwise we're trying to
            // stub it multiple times and throws
            // Error: attempted to wrap collection which is already wrapped
            db.collection.restore();
        });

        describe('With default toViewModel', () => {
            it('Expect to return items', () => {
                // Act
                return data.getAll()
                    .then((models) => {
                        // Assert
                        expect(models).to.deep.equal(items);
                    });
            });
        });

        describe('With custom toViewModel', () => {
            beforeEach(() => {
                ModelClass.toViewModel = (model) => {
                    return model + '1';
                };
            });

            it('Expect to return items', () => {
                // Act
                return data.getAll()
                    .then((models) => {
                        items.forEach((item) => {
                            const viewModel = item + '1';
                            // Assert
                            expect(models).to.contain(viewModel);
                        });
                    });
            });
        });
    });
});

// Partial settings to run mocha in browser
// doesn't work completely
//mocha.run();
