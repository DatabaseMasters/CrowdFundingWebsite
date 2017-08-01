const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const ui = require('./utils/ui');
const test = require('./utils/test-utils');

describe('Home page', () => {
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

    describe('Expects to have ', () => {
        it('title "CrowdFunding"', (done) => {
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

    describe('Expects carousel to have ', () => {
        it('3 items', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.getElements('#myCarousel .item');
                })
                .then((text) => {
                    expect(text).to.have.length(3);
                    done();
                });
        });

        it('only 1 item which is active', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.getElements('#myCarousel .item.active');
                })
                .then((text) => {
                    expect(text).to.have.length(1);
                    done();
                });
        });
    });

    describe('Expects main to have ', () => {
        it('a button with "Start a project"', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.getTexts('#main .btn.btn-primary');
                })
                .then((elements) => {
                    expect(elements).to.have.length(1);
                    const content = elements[0];
                    expect(content).to.equal('Start a project');
                    done();
                });
        });

        it('when clicked on "Start a project" button to' +
            ' redirect to /auth/log-in when user is not logged in"', (done) => {
                driver.get(appUrl)
                    .then(() => {
                        return ui.click('#main .btn.btn-primary');
                    })
                    .then(() => {
                        return driver.getCurrentUrl();
                    })
                    .then((url) => {
                        expect(url).to.equals(appUrl + '/auth/log-in');
                        done();
                    });
            });

        it('4 categories', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.getElements('#main .homeCategories p');
                })
                .then((elements) => {
                    expect(elements).to.have.length(4);
                    done();
                });
        });

        const categories = [
            {
                selector: '#main .homeCategories:nth-of-type(1)',
                text: 'Medical',
                redirect: '/projects#/medical',
            },
            {
                selector: '#main .homeCategories:nth-of-type(2)',
                text: 'Animals',
                redirect: '/projects#/animals',
            },
            {
                selector: '#main .homeCategories:nth-of-type(3)',
                text: 'Community',
                redirect: '/projects#/community',
            },
            {
                selector: '#main .homeCategories:nth-of-type(4)',
                text: 'Other',
                redirect: '/projects#/other',
            }];
        categories.forEach((btn) => test.button(btn));

        it('heading "Popular/new projects"', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.getTexts('#projects-heading');
                })
                .then((elements) => {
                    expect(elements).to.have.length(1);
                    const content = elements[0];
                    expect(content).to.equal('Popular/new projects');
                    done();
                });
        });

        it('a loader when no projects present', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.getElements('#loader-row .loader');
                })
                .then((elements) => {
                    expect(elements).to.have.length(1);
                    done();
                });
        });
    });
});
