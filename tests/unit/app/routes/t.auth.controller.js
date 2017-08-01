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
                addFavourites() {},
                removeFavourites() {},
                getFavouriteProjects() {},
            },
            projects: {
                addUserToLiked() {},
                removeUserFromLikes() {},
                getAll() {},
            },
        };

        controller = init(data);
        req = require('../../../unit/req-res').getRequestMock();
        res = require('../../../unit/req-res').getResponseMock();
    });

    describe('Expect postRegister', () => {
        it('to not register a user when found in database', () => {
            req.body = {
                username: 'testing',
                password: 'testing',
                amount: '1234',
            };
            data.users
                .findByUsername = () => Promise.resolve(req.body);

            return controller.postRegister(req, res)
                .then(() => {
                    // console.log(req.errMsg);
                    expect(res.redirectUrl).to.be.equal('/auth/register');
                    expect(req.errMsg).to.contain('There is user');
                });
        });
        it('to register a user when not found in database and no error logging in', () => {
            req.body = {
                username: 'testing',
                password: 'testing',
                amount: '1234',
            };
            data.users.findByUsername = () => Promise.resolve();
            data.users.create = () => Promise.resolve(req.body);
            req.login = (user, callback) => {
                res.redirect('/');
            };
            return controller.postRegister(req, res)
                .then((result) => {
                    expect(res.redirectUrl).to.be.equal('/');
                });
        });
        it('to not register a user when username empty', () => {
            req.body = { username: '', password: 'testing', amount: '1234' };

            return controller.postRegister(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/auth/register');
                    expect(req.errMsg).to.contain('Enter username please');
                });
        });
        it('to not register a user when password empty', () => {
            req.body = { username: 'testing', password: '', amount: '1234' };

            return controller.postRegister(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/auth/register');
                    expect(req.errMsg).to.contain('Enter password please');
                });
        });
        it('to not register a user when amount is invalid', () => {
            req.body = {
                username: 'testing',
                password: 'testing',
                amount: '-1',
            };

            return controller.postRegister(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.be.equal('/auth/register');
                    expect(req.errMsg).to
                        .contain('Amount should be between 0 and 10 000');
                });
        });
    });

    describe('Expect postFavorites', () => {
        it('to render error message when adding to data fails ', () => {
            res.locals = {
                user: {
                    username: 'testing',
                },
            };
            req.body = {
                favorites: '',
            };
            const result = {
                result: {
                    ok: 0,
                },
            };
            data.users.addFavourites = () => Promise.resolve(result);
            data.projects.addUserToLiked = () => Promise.resolve();
            return controller.postFavorites(req, res)
                .then((r) => {
                    // console.log(req);
                    expect(res.locals.messages.errMsg).to.contain('Failed to add to favourites');
                    expect(res.viewName).to.contain('flash_message_template');
                });
        });
        it('to render success message when adding to data is ok ', () => {
            res.locals = {
                user: {
                    username: 'testing',
                },
            };
            req.body = {
                favorites: '',
            };
            const result = {
                result: {
                    ok: 1,
                },
            };
            data.users.addFavourites = () => Promise.resolve(result);
            data.projects.addUserToLiked = () => Promise.resolve();
            return controller.postFavorites(req, res)
                .then((r) => {
                    // console.log(req);
                    expect(res.locals.messages.errMsg).to.contain('Successfully added to favourites');
                    expect(res.viewName).to.contain('flash_message_template');
                });
        });
    });

    describe('Expect deleteFavorites', () => {
        it('to render error message when removing from data fails', () => {
            res.locals = {
                user: {
                    username: 'testing',
                },
            };
            req.body = {
                favorites: '',
            };
            const result = {
                result: {
                    ok: 0,
                },
            };
            data.users.removeFavourites = () => Promise.resolve(result);
            data.projects.removeUserFromLikes = () => Promise.resolve();
            return controller.deleteFavorites(req, res)
                .then((r) => {
                    expect(res.locals.messages.errMsg).to.contain('Failed to remove from favourites');
                    expect(res.viewName).to.contain('flash_message_template');
                });
        });
        it('to render success message when removing from data is ok', () => {
            res.locals = {
                user: {
                    username: 'testing',
                },
            };
            req.body = {
                favorites: '',
            };
            const result = {
                result: {
                    ok: 1,
                },
            };
            data.users.removeFavourites = () => Promise.resolve(result);
            data.projects.removeUserFromLikes = () => Promise.resolve();
            return controller.deleteFavorites(req, res)
                .then((r) => {
                    expect(res.locals.messages.errMsg).to.contain('Successfully removed from favourites');
                    expect(res.viewName).to.contain('flash_message_template');
                });
        });
    });
    describe('Expect getProfile', () => {
        it('to render users/profile when favorites found', () => {
            req.user = {
                username: 'testing',
            };
            data.users.getFavouriteProjects = () => Promise.resolve([{ favorites: 'a' }]);
            data.projects.getAll = () => Promise.resolve([{ favorites: 'b' }]);

            return controller.getProfile(req, res)
                .then((r) => {
                    expect(res.viewName).to.contain('users/profile');
                });
        });
    });
});
