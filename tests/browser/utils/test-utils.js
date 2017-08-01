const { expect } = require('chai');
const ui = require('./ui');

let driver = null;
let appUrl = null;

const button = (btn) => {
    it(`button "${btn.text}"`, (done) => {
        driver.get(appUrl)
            .then(() => {
                return ui.getTexts(btn.selector);
            })
            .then((texts) => {
                expect(texts).to.have.length(1);
                expect(texts[0]).to.equals(btn.text);
                done();
            });
    });

    it(`when clicked on "${btn.text}" to redirect to ${btn.redirect}`,
        (done) => {
            driver.get(appUrl)
                .then(() => {
                    return ui.click(btn.selector);
                })
                .then(() => {
                    return driver.getCurrentUrl();
                })
                .then((url) => {
                    expect(url).to.equals(appUrl + btn.redirect);
                    done();
                });
        });
};

const registerUser = (user) => {
    return driver.get(appUrl + '/auth/register')
        .then(() => {
            return ui.setValue('#username', user.username);
        })
        .then(() => {
            return ui.setValue('#password', user.password);
        })
        .then(() => {
            return ui.setValue('#amount', user.amount);
        })
        .then(() => {
            return ui.setValue('#first-name', user.firstName);
        })
        .then(() => {
            return ui.setValue('#last-name', user.lastName);
        })
        .then(() => {
            return ui.setValue('#email', user.email);
        })
        .then(() => {
            return ui.click('.submitbtn');
        });
};

const loginUser = (user) => {
    return driver.get(appUrl + '/auth/log-in')
        .then(() => {
            return ui.setValue('#username', user.username);
        })
        .then(() => {
            return ui.setValue('#password', user.password);
        })
        .then(() => {
            return ui.click('.submitbtn');
        })
        .then(() => {
            return ui.click('.modal-dialog .btn.btn-default.center-block');
        })
        .then(() => {
            return ui.waitSeconds(0.5);
        });
};

module.exports = {
    setDriver(_driver) {
        driver = _driver;
    },
    setAppUrl(_appUrl) {
        appUrl = _appUrl;
    },
    button,
    registerUser,
    loginUser,
};
