const getRequestMock = (options = {}) => {
    const req = {
        flash(type, message) {
            if (type) {
                this.errType = type;
            }
            if (message) {
                this.errMsg = message;
            }
            return { errType: this.errType, errMsg: this.errMsg };
        },
        //login(user, errorCallback) {},
    };

    Object.keys(options)
        .forEach((key) => {
            req[key] = options[key];
        });
    return req;
};

const getResponseMock = () => {
    return {
        viewName: '',
        model: null,
        render(viewName, model) {
            this.viewName = viewName;
            this.model = model;
            return this;
        },
        status(statusCode) {
            this.statusCode = statusCode;
            return this;
        },
        send(body) {
            this.body = body;
            return this;
        },
        redirect(status, url) {
            if (!url) {
                this.redirectUrl = status;
            } else {
                this.redirectUrl = url;
                this.status = status;
            }

            return this;
        },
    };
};

module.exports = { getRequestMock, getResponseMock };
