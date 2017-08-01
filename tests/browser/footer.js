const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const ui = require('./utils/ui');
const test = require('./utils/test-utils');

describe('Footer', () => {
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

    describe('Expects on the left navbar to have ', () => {
        it('3 menu items', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.getElements('#main-navigation li');
                })
                .then((texts) => {
                    expect(texts).to.have.length(3);
                    done();
                });
        });

        const buttons = [{
            selector: '#main-navigation li:nth-child(1)',
            text: 'Home',
            redirect: '/',
        },
        {
            selector: '#main-navigation li:nth-child(2)',
            text: 'About',
            redirect: '/',
        },
        {
            selector: '#main-navigation li:nth-child(3)',
            text: 'Contact Us',
            redirect: '/',
        }];

        buttons.forEach((btn) => test.button(btn));

        it(' when clicked on button "Contact Us" modal-dialog should be shown',
            (done) => {
                driver.get(appUrl)
                    .then(() => {
                        return ui.getElements('.modal-dialog');
                    })
                    .then((texts) => {
                        expect(texts).to.have.length(1);
                        done();
                    });
            });
    });

    describe('Expects on the right navbar to have ', () => {

        it('"Subscribe to our weekly newsletter:" text', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.getTexts('.subscribe-text');
                })
                .then((texts) => {
                    expect(texts).to.have.length(1);
                    expect(texts[0])
                        .to.equals('Subscribe to our weekly newsletter:');
                    done();
                });
        });

        it('input field with placeholder "Your email address"', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.getElements('#subscribe-email');
                })
                .then((elments) => {
                    expect(elments).to.have.length(1);
                    return elments[0].getAttribute('placeholder');
                })
                .then((placeholder) => {
                    expect(placeholder)
                        .to.equals('Your email address');
                    done();
                });
        });

        it('button "Subscribe"', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.getTexts('#subscribe-submit');
                })
                .then((texts) => {
                    expect(texts).to.have.length(1);
                    expect(texts[0])
                        .to.equals('Subscribe');
                    done();
                });
        });

        const socialButtons = [
            {
                name: 'Github',
                selector: '.social li:nth-child(1)',
                redirect: 'https://github.com/TeamVencedores/CrowdFundingWebsite',
            },
            {
                name: 'Facebook',
                selector: '.social li:nth-child(2)',
                redirect: 'https://www.facebook.com/',
            },
            {
                name: 'Twitter',
                selector: '.social li:nth-child(3)',
                redirect: 'https://twitter.com/',
            },
            {
                name: 'Google+',
                selector: '.social li:nth-child(4)',
                redirect: 'https://plus.google.com/',
            },
            {
                name: 'YouTube',
                selector: '.social li:nth-child(5)',
                redirect: 'https://www.youtube.com/',
            },
            {
                name: 'LinkedIn',
                selector: '.social li:nth-child(6)',
                redirect: 'https://www.linkedin.com/',
            }];

        socialButtons.forEach((btn) => {
            it(`when clicked on "${btn.name}" button it should redirect to ` +
                btn.redirect,
                (done) => {
                    driver.get(appUrl)
                        .then(() => {
                            return ui.click(btn.selector);
                        })
                        .then(() => {
                            return driver.getCurrentUrl();
                        })
                        .then((url) => {
                            expect(url).to.include(btn.redirect);
                            done();
                        });
                });
        });
    });
});
