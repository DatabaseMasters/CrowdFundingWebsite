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

            },
        };

        controller = init(data);
        req = require('../../../unit/req-res').getRequestMock();
        res = require('../../../unit/req-res').getResponseMock();
    });

    describe('Expect ', () => {

    });
});
