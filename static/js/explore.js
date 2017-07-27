/* globals $ requester clientRouter*/

var descriptions = {
    'explore projects': 'Find projects which you can help now',
    'medical': 'Donate to alleviate suffering and restore lives of adults and children',
    'animals': 'Save cute pets or endangered species from suffering',
    'culture': 'Support art, social and cultural events or individuals',
    'other': 'Everything else you can be a hero for'
}

var images = {
    'explore projects': '../static/images/children-bubbles.jpg',
    'medical': '../static/images/climber-sea.jpg',
    'animals': '../static/images/Climbers-shadow.jpg',
    'culture': '../static/images/FacetheSunShadowCseeker.jpg',
    'other': '../static/images/family-shadow-sea.jpg'
}

// filter projects by selected category

clientRouter
    .on('category/:category', function(params) {
        return load(params)
    });

//$(window).on('load', () => console.log(router._routes));
$(window).on('hashchange', function() {
    return clientRouter.navigate()
});

var load = function(params) {
    var name = params.category;
    var url = '/api/projects?category=' + name;

    // Set name when empty (getting all projects)
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
