/* globals $ */

var requester = (function () {

    function request(method, url, options, isJson) {
        options = options || {};
        var headers = options.headers || {};
        var body = options.data || {};
        var cntType = isJson === false ? 'text/html' : 'application/json';
        var parsedData = isJson === false ? body : JSON.stringify(body);

        var promise = new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                method: method,
                contentType: cntType,
                headers: headers,
                data: parsedData,
                success: function (res) {
                    resolve(res);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    function get(url, options) {
        return request('GET', url, options, false);
    }

    function post(url, options, isJson) {
        return request('POST', url, options, isJson);
    }

    function put(url, options, isJson) {
        return request('PUT', url, options, isJson);
    }

    function del(url, options, isJson) {
        return request('DELETE', url, options, isJson);
    }

    return {
        //send: send,
        get: get,
        post: post,
        put: put,
        delete: del,
    };
}());
