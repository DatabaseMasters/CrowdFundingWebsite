const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const ui = require('./utils/ui');
const webdriver = require('selenium-webdriver');

describe('Home page', () => {
    const appUrl = 'http://localhost:3002';
    let driver = null;

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
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
                    return ui.getElements('#myCarousel .item');
                })
                .then((text) => {
                    expect(text).to.have.length(3);
                    done();
                });
        });

        it(' only 1 item which is active', (done) => {
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

    describe('Expects main to have', () => {
        it(' a button with "Start a project"', (done) => {
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

        it(' when clicked on "Start a project" button to' +
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

        it(' 4 categories', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.getElements('#main .homeCategories p');
                })
                .then((elements) => {
                    expect(elements).to.have.length(4);
                    done();
                });
        });

        const categories = ['Medical', 'Animals', 'Community', 'Other'];

        categories.forEach((category) => {
            it(` category "${category}"`, (done) => {
                driver.get(appUrl)
                    .then(() => {
                        return ui.getTexts('#main .homeCategories p');
                    })
                    .then((elements) => {
                        expect(elements).to.contain(category);
                        done();
                    });
            });
        });

        categories.forEach((category) => {
            const categoryLower = category.toLowerCase();
            it(` when clicked on ${category} ` +
                `button to redirect to /projects#/${categoryLower}`,
                (done) => {
                    driver.get(appUrl)
                        .then(() => {
                            const index = categories.indexOf(category);
                            return ui
                                .click('#main .homeCategories:nth-of-type(' +
                                `${index + 1})`);
                        })
                        .then(() => {
                            return driver.getCurrentUrl();
                        })
                        .then((url) => {
                            expect(url).to.
                                equals(appUrl + `/projects#/${categoryLower}`);
                            done();
                        });
                });
        });


        it(' heading "Popular/new projects"', (done) => {
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

        it(' a loader when no projects present', (done) => {
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
