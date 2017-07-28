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

function load(params) {
    var name = params.category;
    var url = '/api/projects?category=' + name;

    // Set name when empty (getting all projects)
    if (name === '') {
        name = 'explore projects'
    }

    // Get processed html, change title, change projects
    requester.get(url)
        .then(function(response) {
            refreshTitle(name);
            refreshProjects(response);
        })
        .catch(function(err) {
            console.log('--- GET URL ERROR ---' + err);
        })
};

// Update title, description and cover image
function refreshTitle(name) {
    $('#title').text(name.charAt(0).toUpperCase() + name.slice(1));
    $('#description').text(descriptions[name]);
    $('.jumbotron').css({
        'background': 'linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)),url(' + images[name] + ')',
        'background-repeat': 'repeat',
        'background-position': 'center center, center',
        'color': '#FFF'
    });
}

function refreshProjects(html) {
    $('#projects').html(html);
};


clientRouter
    .on('category/:category', function(params) {
        return load(params)
    });

$(window).on('load', clientRouter.navigate);
$(window).on('hashchange', function() {
    return clientRouter.navigate()
});
