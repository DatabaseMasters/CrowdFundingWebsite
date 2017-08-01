const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const ui = require('./utils/ui');
const test = require('./utils/test-utils');

describe('Navigation', () => {
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

    describe('Expects navbar to have ', () => {
        it('logo "CrowdFunding"', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.getTexts('#logo');
                })
                .then((texts) => {
                    expect(texts).to.have.length(1);
                    const text = texts[0];
                    expect(text).to.equals('CrowdFunding');
                    done();
                });
        });

        const buttons = [{
            selector: '#explore-nav',
            text: 'Explore',
            redirect: '/projects',
        },
        {
            selector: '#new-nav',
            text: 'Start a project',
            redirect: '/auth/log-in',
        },
        {
            selector: '#about-nav',
            text: 'About',
            redirect: '/about',
        }];

        buttons.forEach((btn) => test.button(btn));
    });

    describe('Expects left-side nav to have ', () => {
        it('"Search" button"', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.getTexts('#search-submit');
                })
                .then((texts) => {
                    expect(texts).to.have.length(1);
                    const text = texts[0];
                    expect(text).to.equals('Search');
                    done();
                });
        });

        it('when clicked on "Search" button one should remain on same page' +
            ' and "Search results" header should be shown "', (done) => {
                driver.get(appUrl)
                    .then(() => {
                        return ui.click('#search-submit');
                    })
                    .then(() => {
                        return driver.getCurrentUrl();
                    })
                    .then((url) => {
                        expect(url).to.equals(appUrl + '/');
                    })
                    .then(() => {
                        return ui.getTexts('#search');
                    })
                    .then((texts) => {
                        expect(texts).to.have.length(1);
                        const text = texts[0];
                        expect(text).to.equals('Search results');
                        done();
                    });
            });

        it('"Search" input field with "Search" placeholder', (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.getElements('#search-form input');
                })
                .then((elements) => {
                    expect(elements).to.have.length(1);
                    return elements[0].getAttribute('placeholder');
                })
                .then((placeholder) => {
                    expect(placeholder).to.equals('Search');
                    done();
                });
        });

        it('when text entered and clicked on "Search" button' +
            ' "Searched value: No results found for "text""' +
            ' should be shown when no projects present"', (done) => {
                const text = 'test';
                driver.get(appUrl)
                    .then(() => {
                        return ui.setValue('#search-form input', text);
                    })
                    .then(() => {
                        return ui.click('#search-submit');
                    })
                    .then(() => {
                        return ui.waitSeconds(0.5);
                    })
                    .then(() => {
                        return ui.getTexts('.pull-left h2');
                    })
                    .then((texts) => {
                        expect(texts).to.have.length(1);
                        const content = texts[0];
                        expect(content).to.equals(
                            'Searched value: No results found for "' +
                            text + '"');
                        done();
                    });
            });

        it('when text entered and clicked on "Search" button' +
            ' the table should be empty when no projects present"', (done) => {
                const text = 'test';
                driver.get(appUrl)
                    .then(() => {
                        return ui.setValue('#search-form input', text);
                    })
                    .then(() => {
                        return ui.click('#search-submit');
                    })
                    .then(() => {
                        return ui.waitSeconds(0.5);
                    })
                    .then(() => {
                        return ui.getElements('tr');
                    })
                    .then((texts) => {
                        expect(texts).to.have.length(0);
                        done();
                    });
            });
    });

    describe('Expects right-side nav to have when user not logged in', () => {
        const rightbuttons = [{
            selector: '.navbar-right li:nth-child(1)',
            text: 'Log in',
            redirect: '/auth/log-in',
        },
        {
            selector: '.navbar-right li:nth-child(2)',
            text: 'Register',
            redirect: '/auth/register',
        }];

        rightbuttons.forEach((btn) => {
            test.button(btn);
        });
    });

    describe('Expects right-side nav to have when user logged in', () => {
        const testUser = {
            username: 'penka', password: 'penka123',
            amount: 100, firstName: 'Penka', 'lastName': 'Penkova',
            email: 'penka.penkova@gmail.com',
        };

        it(` Profile button"`, (done) => {
            test.registerUser(testUser)
                .then(() => {
                    return ui.getTexts('#profile-name');
                })
                .then((texts) => {
                    expect(texts).to.have.length(1);
                    expect(texts[0]).to.equals(testUser.username);
                    done();
                });
        });

        it(` Profile button when clicked should redirect to /auth/profile`,
            (done) => {
                testUser.username += 1;
                test.registerUser(testUser)
                    .then(() => {
                        return ui.click('#profile-name');
                    })
                    .then(() => {
                        return driver.getCurrentUrl();
                    })
                    .then((url) => {
                        expect(url).to.equals(appUrl + '/auth/profile');
                        done();
                    });
            });

        it(` Logout button"`, (done) => {
            testUser.username += 2;
            test.registerUser(testUser)
                .then(() => {
                    return ui.getTexts('#log-out');
                })
                .then((texts) => {
                    expect(texts).to.have.length(1);
                    expect(texts[0]).to.equals('Log-out');
                    done();
                });
        });

        it(` Profile button when clicked should redirect to /auth/profile`,
            (done) => {
                testUser.username += 3;
                test.registerUser(testUser)
                    .then(() => {
                        return ui.click('#log-out');
                    })
                    .then(() => {
                        return driver.getCurrentUrl();
                    })
                    .then((url) => {
                        expect(url).to.equals(appUrl + '/');
                        done();
                    });
            });
    });
});
