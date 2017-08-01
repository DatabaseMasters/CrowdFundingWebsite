const { expect } = require('chai');
const { init } = require(
    '../../../../app/routes/projects.router/controller');

describe('Projects controller tests', () => {
    let data = null;
    let controller = null;

    let req = null;
    let res = null;

    beforeEach(() => {
        data = {
            projects: {
                getAll() {},
                getNextProjectRef() {},
                create() {},
            },
        };

        controller = init(data);
        req = require('../../../unit/req-res').getRequestMock();
        res = require('../../../unit/req-res').getResponseMock();
    });

    // REVIEW??
    // afterEach(() => {
    //     data.projects.restore();
    // });

    describe('Expect getProject', () => {
        it('to return project if project is in database', () => {
            data.projects.getAll = () => Promise.resolve([1]);
            req.params = { id: 1 };
            return controller.getProject(req, res)
                .then(() => {
                    expect(res.model).to.be.deep.equal({ model: 1 });
                    expect(res.viewName).to.be.equal('projects/details');
                });
        });

        it('to redirect if project id is wrong', () => {
            data.projects.getAll = () => Promise.resolve([]);
            req.params = { id: 12345 };
            return controller.getProject(req, res)
                .then((response) => {
                    expect(response.redirectUrl).to.be.deep.equal('/404');
                });
        });
    });

    describe('Expect postProject', () => {
        it('to redirect to project page when successfully created', () => {
            const project = { ref: 88 };
            data.projects.getNextProjectRef = () => Promise.resolve(project.ref);
            data.projects.create = () => Promise.resolve(project);

            req.body = {};
            req.file = '12345';
            req.user = { username: '' };
            return controller.postProject(req, res)
                .then((proj) => {
                    expect(res.statusCode).to.be.deep.equal(201);
                    expect(res.redirectUrl).to.be.equal('/projects/88');
                });
        });

        it('to reload projects/new page when no file passed', () => {
            const project = {};
            data.projects.getNextProjectRef = () => Promise.resolve(1);
            data.projects.create = () => Promise.resolve(project);

            return controller.postProject(req, res)
                .then((response) => {
                    expect(response.viewName).to.be.deep.equal('projects/new');
                });
        });
    });
});
