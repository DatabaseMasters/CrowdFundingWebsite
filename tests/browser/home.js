const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const { setDriver, getText, getTexts } = require('./utils/ui');
const webdriver = require('selenium-webdriver');

describe('Home page tests', () => {
    const appUrl = 'http://localhost:3002';
    let driver = null;

    beforeEach(() => {
        driver = setupDriver('chrome');
        setDriver(driver);
    });

    afterEach(() => {
        driver.quit();
    });

    describe('Title and headings', () => {
        it(' expects title to be CrowdFunding', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return driver.getTitle();
                })
                .then((text) => {
                    expect(text).to.equal('CrowdFunding');
                    done();
                });
        });
    });

    describe('Main', () => {
        it(' expect to have a btn with "Start a project" present', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return getTexts('#main .btn.btn-primary');
                })
                .then((elements) => {
                    expect(elements).to.have.length(1);
                    const content = elements[0];
                    expect(content).to.equal('Start a project');
                    done();
                });
        });
    });

    // it('expect h1 with text "I am Home Welcome"', (done) => {
    //     driver.get(appUrl)
    //         .then(() => {
    //             return driver.findElement(
    //                 webdriver.By.css('h1')
    //             );
    //         })
    //         .then((el) => {
    //             return el.getText();
    //         })
    //         .then((text) => {
    //             expect(text).to.contain('I am Not Home');
    //             done();
    //         });
    // });
});
