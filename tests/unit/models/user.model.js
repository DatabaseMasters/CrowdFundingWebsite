const { expect } = require('chai');
const sinon = require('sinon');
const UserModel = require('../../../models/user.model.js');

describe('User model tests', () => {

    describe('Expect isValid', () => {
        it('to return true when valid object is passed', () => {
            const model = {
                username: 'validOne',
                password: 'ValidOne',
            };
            UserModel.isValid(model).then((result) => {
                expect(result.bool).to.be.true;
            });
        });

        it('to return false when invalid object is passed', () => {
            const model = {
                username: 'v',
                password: 'V',
            };

            UserModel.isValid(model).then((result) => {
                expect(result.bool).to.be.false;
            });
        });
    });
});
