const { expect } = require('chai');
const attachRoutes = require(
    '../../../../../app/routes/projects.router/router');

describe('Projects router tets', () => {
    let app = {
        route: null,
        func: null,
        use(route, func) {
            console.log('in use ======s');
            console.log(route);
            this.route = route;
            this.func = func;
        },
    };
    const data = {};

    let req = null;
    let res = null;

    beforeEach(() => {
        attachRoutes(app, data);

        req = require('../../../../unit/req-res').getRequestMock();
        res = require('../../../../unit/req-res').getResponseMock();
    });

    // Attempt to unit test routes without supertest!
    // it('Expect /projects to render projects/explore', () => {
    //     const result = app.func.get('/');
    //     console.log('============');
    //     console.log(result);
    //     console.log('============');
    //     expect(result.viewName).to.be.equal('projects/explore');
    // });
});
