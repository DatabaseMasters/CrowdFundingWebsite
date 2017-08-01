const { expect } = require('chai');
const { init } = require(
    '../../../../app/routes/auth.router/controller.js');

describe('Auth controller tests', () => {
    let data = null;
    let controller = null;

    let req = null;
    let res = null;

    beforeEach(() => {
        data = {
            users: {
                findByUsername() {},
                create() {},
            },
        };

        controller = init(data);
        req = require('../../../unit/req-res').getRequestMock();
        res = require('../../../unit/req-res').getResponseMock();
    });

    describe('Expect postRegister', () => {
        it('to not register a user when found in database', () => {
            req.body = { username: 'testing', password: 'testing', amount: '1234' };
            data.users.findByUsername = () => Promise.resolve({ username: 'testing', password: 'testing' });
            req.flash = (type, message) => {
                req.errType = type;
                req.errMsg = message;
            };
            req.login = (user, errorCallback) => {};

            return controller.postRegister(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/auth/register');
                    // console.log(res.errMsg);
                    // expect(res.errMsg).to.contain('There is user');
                });
        });
        it('to register a user when not found in database', () => {
            // req.body = { username: 'testing', password: 'testing', amount: '1234' };
            // data.users.findByUsername = () => Promise.resolve();
            // data.users.create = () => Promise.resolve({});
            // req.login = () => {};
            // return controller.postRegister(req, res)
            //     .then(() => {
            //         console.log(res.statusCode);
            //         expect(res.model).to.be.deep.equal({});
            //         expect(res.viewName).to.be.equal('/auth/register');
            //     });
        });
    });
});
