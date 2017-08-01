const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const ui = require('./utils/ui');
const test = require('./utils/test-utils');

describe('Start a new project Form', () => {
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

    describe('Expects "Start a new project" form ', () => {
        const testUser = {
            username: 'ivan4o', password: 'ivan123',
            amount: 1000, firstName: 'Ivan', lastName: 'Ivanov',
            email: 'ivan.ivanov@gmail.com',
        };

        it(` to appear and redirect to /projects/new` +
            ` when logged user clicks "Start a project form nav"`,
            (done) => {
                test.registerUser(testUser)
                    .then(() => {
                        return ui.click('#new-nav');
                    })
                    .then(() => {
                        return driver.getCurrentUrl();
                    })
                    .then((url) => {
                        expect(url).to.equal(appUrl + '/projects/new');
                        return Promise.resolve();
                    })
                    .then(() => {
                        return ui.getTexts('.modal-header h3');
                    })
                    .then((texts) => {
                        expect(texts).to.contains('START A NEW PROJECT');
                        done();
                    });
            });

        it(`when a new project was created successfully redirect to project page `,
            (done) => {
                testUser.username += 1;
                test.registerUser(testUser)
                    .then(() => {
                        return ui.click('#new-nav');
                    })
                    .then(() => {
                        return driver.getCurrentUrl();
                    })
                    .then((url) => {
                        expect(url).to.equal(appUrl + '/projects/new');
                        return Promise.resolve();
                    })
                    .then(() => {
                        return ui.setValue('#title', 'veryyyy loooooooont title aslkdjaslkjdasklj');
                    })
                    .then(() => {
                        return driver.executeScript('document.getElementById("file").style.display = "block"');
                    })
                    .then(() => {
                        return ui.getElement('#file');
                    })
                    .then((element) => {
                        return element.sendKeys(__dirname + '/static/images/children-bubbles.jpg');
                    })
                    .then((element) => {
                        return ui.setValue('#video', 'https://www.youtube.com/embed/HKMlLdcuyBE');
                    })
                    .then((element) => {
                        return ui.setValue('#motto', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et');
                    })
                    .then((element) => {
                        return ui.setValue('#description', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a');
                    })
                    .then((element) => {
                        return ui.setValue('#amount', 1100);
                    })
                    .then((element) => {
                        console.log('amout');
                        return driver.executeScript('document.getElementById("ending").value = "2018-01-01"');
                    })
                    .then((element) => {
                        return ui.click('.submitbtn');
                    })
                    .then(() => {
                        return driver.getCurrentUrl();
                    })
                    .then((url) => {
                        expect(url).to.include(appUrl + '/projects');
                        done();
                    });
            });
    });
});

