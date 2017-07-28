/* globals $ */

var requester = (function() {

    function request(method, url, options) {
        options = options || {};
        var headers = options.headers || {};
        var data = options.data || {};

        promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                method: method,
                contentType: 'text/html', //'application/json',
                headers: headers,
                data: data, //JSON.stringify(data),
                success: function(res) {
                    resolve(res);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    function get(url, options) {
        return request('GET', url, options);
    }

    function post(url, options) {
        return request('POST', url, options);
    }

    function put(url, options) {
        return request('PUT', url, options);
    }

    // function del(url, options) {
    //     return send('POST', url, options);
    // }

    return {
        //send: send,
        get: get,
        post: post,
        put: put
            // delete: del
    };
}());
