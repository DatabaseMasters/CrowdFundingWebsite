const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const ui = require('./utils/ui');
const test = require('./utils/test-utils');

describe('About', () => {
    const appUrl = 'http://localhost:3002';
    let driver = null;

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
        test.setDriver(driver);
        test.setAppUrl(appUrl);
    });

    afterEach(() => {
        driver.quit();
    });

    describe('Expects About to ', () => {
        it('have "About" title',
            (done) => {
                driver.get(appUrl + '/about')
                    .then(() => {
                        return ui.getTexts('#title');
                    })
                    .then((texts) => {
                        expect(texts).to.have.length(1);
                        expect(texts[0]).to.equals('About');
                        done();
                    });
            });

        it('have section heading ' +
            '"CrowdFunding was developed by these nice people"',
            (done) => {
                driver.get(appUrl + '/about')
                    .then(() => {
                        return ui.getTexts('.section.about h2');
                    })
                    .then((texts) => {
                        expect(texts).to.have.length(1);
                        expect(texts[0]).to.equals(
                            'CrowdFunding was developed by these nice people');
                        done();
                    });
            });

        it(`have founders names`,
            (done) => {
                driver.get(appUrl + '/about')
                    .then(() => {
                        return ui.getTexts('.members h3');
                    })
                    .then((texts) => {
                        expect(texts).to.have.length(3);
                        expect(texts).to.include.members([
                            'Aleksandar Ikonomov',
                            'Milena Sapunova',
                            'Nadezhda Hristova',
                        ]);
                        done();
                    });
            });
    });
});

