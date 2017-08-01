const { expect } = require('chai');
const { init } = require(
    '../../../../app/routes/api.router/controller');

describe('Api controller tests', () => {
    let data = null;
    let controller = null;

    let req = null;
    let res = null;

    beforeEach(() => {
        data = {
            projects: {
                getAll() {},
            },
            subscribers: {
                findByEmail() {},
                create() {},
            },
            feedback: {
                create() {},
            }
        };

        controller = init(data);
        req = require('../../../unit/req-res').getRequestMock();
        res = require('../../../unit/req-res').getResponseMock();
    });

    describe('Expect getSearch', () => {
        it('to render projects/search when query returns a value', () => {
            req.query = 'a';
            data.projects.getAll = () => Promise.resolve([{}]);

            return controller.getSearch(req, res)
                .then((r) => {
                    expect(res.viewName).to.equal('projects/search');
                });
        });
        it('to render projects/search with "no results" message when query produces no values', () => {
            req.query = 'a';
            data.projects.getAll = () => Promise.resolve([]);

            return controller.getSearch(req, res)
                .then((r) => {
                    expect(res.viewName).to.equal('projects/search');
                    expect(res.model.model.value).to.contain('No results');
                });
        });
    });

    describe('Expect getProjects', () => {
        it('to render projects/projects with model object when query returns a value', () => {
            req.query = { category: {}, page: 1 };
            data.projects.getAll = () => Promise.resolve([{}]);

            return controller.getProjects(req, res)
                .then((r) => {
                    expect(res.viewName).to.equal('projects/projects');
                    expect(res.model).to.have.property('model');
                });
        });
        it('to send "No project" message when query produces no values', () => {
            req.query = { category: {}, page: 1 };
            data.projects.getAll = () => Promise.resolve([]);

            return controller.getProjects(req, res)
                .then((r) => {
                    expect(res.body).to.contain('No projects');
                });
        });
    });

    describe('Expect postSubscribe', () => {
        it('to send "Email already registered" message when query returns a value', () => {
            req.body = { email: '' };
            data.subscribers.findByEmail = () => Promise.resolve({});

            return controller.postSubscribe(req, res)
                .then((r) => {
                    expect(res.body.message).to.contain('Email already registered');
                });
        });
        it('to send "Thank you" message when query produces no values', () => {
            req.body = { email: '' };
            data.subscribers.findByEmail = () => Promise.resolve();
            data.subscribers.create = () => Promise.resolve({});

            return controller.postSubscribe(req, res)
                .then((r) => {
                    expect(res.body.message).to.contain('Thank you');
                });
        });
    });

    describe('Expect postFeedback', () => {
        it('to render flash template with "Thank you" message when post successful', () => {
            res.locals = {};
            data.feedback.create = () => Promise.resolve({});

            return controller.postFeedback(req, res)
                .then((r) => {
                    expect(res.viewName).to.equal('flash_message_template');
                    expect(res.locals.messages.errMsg).to.contain('Thank you');
                });
        });
        it('to render flash template with "Error" message when post unsuccessful', () => {
            res.locals = {};
            data.feedback.create = () => Promise.reject();

            return controller.postFeedback(req, res)
                .then((r) => {
                    expect(res.viewName).to.equal('flash_message_template');
                    expect(res.locals.messages.errMsg).to.contain('Error sending');
                });
        });
    });
});
