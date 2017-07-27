var clientRouter = (function() {
    var routes = [];

    function on(targetUrl, callback) {
        this.routes.push({
            targetUrl,
            callback
        });

        return this;
    }

    function navigate() {
        var currentUrl = location.hash.slice(1);

        for (var route of routes) {
            var targetUrl = route.targetUrl;
            var callback = route.callback;
            var params = matchUrls(currentUrl, targetUrl);
            if (params) {
                callback(params);
                break;
            }
        }
    }

    function matchUrls(currentUrl, targetUrl) {
        var currentUrlParts = currentUrl.split(/\//g);
        var targetUrlParts = targetUrl.split(/\//g);

        if (targetUrlParts.length !== currentUrlParts.length) {
            return false;
        }

        var params = {};
        var len = currentUrlParts.length;
        // Loop and extract only parts starting with colon
        for (var i = 0; i < len; i++) {
            if (targetUrlParts[i][0] !== ':') {
                if (currentUrlParts[i] !== targetUrlParts[i]) {
                    return false;
                }
            } else {
                // Remove colon
                var paramName = targetUrlParts[i].slice(1);
                params[paramName] = currentUrlParts[i];
            }
        }

        return params;
    }

    return {
        routes: routes,
        on: on,
        navigate: navigate
    };
}());
