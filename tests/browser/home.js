const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const { setDriver, getText, getTexts, getElements, getSelected } = require('./utils/ui');
const webdriver = require('selenium-webdriver');

describe('Home page', () => {
    const appUrl = 'http://localhost:3002';
    let driver = null;

    beforeEach(() => {
        driver = setupDriver('chrome');
        setDriver(driver);
    });

    afterEach(() => {
        driver.quit();
    });

    describe('Expects to have', () => {
        it(' title "CrowdFunding"', (done) => {
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
        it(' 3 items', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return getElements('#myCarousel .item');
                })
                .then((text) => {
                    expect(text).to.have.length(3);
                    done();
                });
        });

        it(' 1 item which is active', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return getElements('#myCarousel .item.active');
                })
                .then((text) => {
                    expect(text).to.have.length(1);
                    done();
                });
        });
    });

    describe('Expects main to have', () => {
        it(' a button with "Start a project"', (done) => {
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

        it(' 4 categories', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return getElements('#main .homeCategories p');
                })
                .then((elements) => {
                    expect(elements).to.have.length(4);
                    done();
                });
        });

        ['Medical', 'Animals', 'Community', 'Other'].forEach((category) => {
            it(` category "${category}"`, (done) => {
                driver.get(appUrl)
                    .then(() => {
                        return getTexts('#main .homeCategories p');
                    })
                    .then((elements) => {
                        expect(elements).to.contain(category);
                        done();
                    });
            });
        });

        it(' heading "Popular/new projects"', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return getTexts('#projects-heading');
                })
                .then((elements) => {
                    expect(elements).to.have.length(1);
                    const content = elements[0];
                    expect(content).to.equal('Popular/new projects');
                    done();
                });
        });

        it(' a loader when no projects present', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return getElements('#loader-row .loader');
                })
                .then((elements) => {
                    expect(elements).to.have.length(1);
                    done();
                });
        });
    });
});
