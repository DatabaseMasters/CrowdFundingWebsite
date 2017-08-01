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
    });
});
