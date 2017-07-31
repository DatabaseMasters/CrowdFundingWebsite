const { expect } = require('chai');
const { init } = require(
    '../../../../../app/routes/projects.router/controller');

describe('Projects router tests', () => {
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
        req = require('../../../../unit/req-res').getRequestMock();
        res = require('../../../../unit/req-res').getResponseMock();
    });

    it('Expect getAll to return project if project in database', () => {
        data.projects.getAll = () => Promise.resolve([1]);
        req.params = { id: 1 };
        return controller.getAll(req, res)
            .then(() => {
                expect(res.context).to.be.deep.equal({ model: 1 });
                expect(res.viewName).to.be.equal('projects/details');
            });
    });

    it('Expect getAll to redirect if project id is wrong', () => {
        data.projects.getAll = () => Promise.resolve([]);
        req.params = { id: 12345 };
        return controller.getAll(req, res)
            .then((response) => {
                expect(response.redirectUrl).to.be.deep.equal('/404');
            });
    });
});
