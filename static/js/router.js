/* globals $ requester*/

class ClientRouter {
    constructor() {
        this._routes = [];
    }

    on(targetUrl, callback) {
        this._routes.push({
            targetUrl,
            callback
        });

        return this;
    }

    navigate() {
        const currentUrl = location.hash.slice(1);

        // Destructuring assignment
        for (const { targetUrl, callback }
            of this._routes) {
            const params = ClientRouter.matchUrls(currentUrl, targetUrl);
            if (params) {
                callback(params);
                break;
            }
        }
    }

    // For UT purposes it's better that 
    // both current and target Urls be passed as params to the function
    static matchUrls(currentUrl, targetUrl) {
        const currentUrlParts = currentUrl.split(/\//g);
        const targetUrlParts = targetUrl.split(/\//g);

        if (targetUrlParts.length !== currentUrlParts.length) {
            return false;
        }

        const params = {};
        const len = currentUrlParts.length;
        // Loop and extract only parts starting with colon
        for (var i = 0; i < len; i++) {
            if (targetUrlParts[i][0] !== ':') {
                if (currentUrlParts[i] !== targetUrlParts[i]) {
                    console.log('--- NO MATCH ---');
                    return false;
                }
            } else {
                // Remove colon
                const paramName = targetUrlParts[i].slice(1);
                params[paramName] = currentUrlParts[i];
            }
        }
        console.log('params');
        console.log(params);
        return params;
    }
}

var descriptions = {
    'explore projects': 'Find projects which you can help now',
    medical: 'Donate to alleviate suffering and restore lives of adults and children',
    animals: 'Save cute pets or endangered species from suffering',
    culture: 'Support art, social and cultural events or individuals',
    other: 'Everything else you can be a hero for'
}

var images = {
    'explore projects': '../static/images/children-bubbles.jpg',
    medical: '../static/images/climber-sea.jpg',
    animals: '../static/images/Climbers-shadow.jpg',
    culture: '../static/images/FacetheSunShadowCseeker.jpg',
    other: '../static/images/family-shadow-sea.jpg'
}

var load = function(params) {
    let name = params.category;
    const url = '/api/items?category=' + name;
    console.log(url);
    if (name === '') {
        name = 'explore projects'
    }
    // Update title, description and cover image
    $('#title').text(name.charAt(0).toUpperCase() + name.slice(1));
    $('#description').text(descriptions[name]);
    $('.jumbotron').css({
        'background': 'linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)),url(' + images[name] + ')',
        'background-repeat': 'repeat',
        'background-position': 'center center, center',
        'color': '#FFF'
    });

    // Get processed html and insert it in place of old html
    requester.get(url)
        .then(updateHTML)
        .catch((err) => {
            console.log('--- GET URL ERROR ---' + err);
        })
};

var updateHTML = function(html) {
    $('#projects').html(html);
};


const router = new ClientRouter();

router
    .on('category/:category', (params) => load(params));

//$(window).on('load', () => console.log(router._routes));
$(window).on('hashchange', () => router.navigate());
