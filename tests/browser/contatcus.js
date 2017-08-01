const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const ui = require('./utils/ui');
const test = require('./utils/test-utils');

describe('Contact Us Form', () => {
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

    describe('Expects Contact Us ', () => {
        it('to appear when button "Contact Us" clicked',
            (done) => {
                driver.get(appUrl)
                    .then(() => {
                        return ui.click('#main-navigation li:nth-child(3)');
                    })
                    .then(() => {
                        return ui.waitSeconds(1);
                    })
                    .then(() => {
                        return ui.getTexts('#modal-label');
                    })
                    .then((texts) => {
                        expect(texts).to.have.length(1);
                        expect(texts[0]).to.equals('New message');
                        done();
                    });
            });

        it('to have input "Your name:", "Subject:", "Message:"',
            (done) => {
                driver.get(appUrl)
                    .then(() => {
                        return ui.click('#main-navigation li:nth-child(3)');
                    })
                    .then(() => {
                        return ui.waitSeconds(1);
                    })
                    .then(() => {
                        return ui.getTexts('.modal-dialog label');
                    })
                    .then((texts) => {
                        expect(texts).to.have.length(3);
                        expect(texts).to.contain('Your name:');
                        expect(texts).to.contain('Subject:');
                        expect(texts).to.contain('Message:');
                        done();
                    });
            });

        it('when filled to show "Thank you for your feedback" message',
            (done) => {
                driver.get(appUrl)
                    .then(() => {
                        return ui.click('#main-navigation li:nth-child(3)');
                    })
                    .then(() => {
                        return ui.waitSeconds(1);
                    })
                    .then(() => {
                        return ui.setValue('#sender-name', 'Penka');
                    })
                    .then(() => {
                        return ui.setValue('#subject-text', 'Testing');
                    })
                    .then(() => {
                        return ui.setValue('#message-text', 'Test Message');
                    })
                    .then(() => {
                        return ui.click('#feedback-submit');
                    })
                    .then(() => {
                        return ui.waitSeconds(1);
                    })
                    .then(() => {
                        return ui.getText('.modal-dialog h3');
                    })
                    .then((text) => {
                        expect(text).to.equals('Thank you for your feedback');
                        done();
                    });
            });
    });
});
