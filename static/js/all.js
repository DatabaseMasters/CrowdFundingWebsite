/* globals $ */
window.onload = function() {
    console.log('--- Client JS loaded ---');
};

var descriptions = {
    explore: 'Find projects which you can help now',
    medical: 'Donate to alleviate suffering and restore lives of adults and children',
    animals: 'Save cute pets or endangered species from suffering',
    culture: 'Support art, social and cultural events or individuals',
    other: 'Everything else you can be a hero for'
}

var images = {
    explore: '../static/images/children-bubbles.jpg',
    medical: '../static/images/climber-sea.jpg',
    animals: '../static/images/Climbers-shadow.jpg',
    culture: '../static/images/FacetheSunShadowCseeker.jpg',
    other: '../static/images/family-shadow-sea.jpg'
}

// filter projects by selected category

$('.dropdown-menu').click(function(event) {
    var clickedId = event.target.id;
    $('#title').text(clickedId.charAt(0).toUpperCase() + clickedId.slice(1));
    $('#description').text(descriptions[clickedId]);
    // changing background - doesn't work
    //$(this).find('.jumbotron').css('background', 'linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)), url(' + images[clickedId] + ')');
    $('.jumbotron').css({
        'background': 'linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)),url(' + images[clickedId] + ')',
        'background-repeat': 'no-repeat',
        'background-position': 'center center, center',
        'color': '#FFF'
    });

    if (clickedId === 'all') {
        requester.get('/api/items?category=')
            .then(reloadProjects);
    } else if (clickedId === 'medical') {
        requester.get('/api/items?category=medical')
            .then(reloadProjects);
    } else if (clickedId === 'animals') {
        requester.get('/api/items?category=animals')
            .then(reloadProjects);
    } else if (clickedId === 'culture') {
        requester.get('/api/items?category=culture')
            .then(reloadProjects);
    } else if (clickedId === 'other') {
        requester.get('/api/items?category=other')
            .then(reloadProjects);
    }
});

var reloadProjects = function(html) {
    $('#projects').html(html);
};
z