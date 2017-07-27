/* globals $ requester*/
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
    // Change title, description and cover image
    $('#title').text(clickedId.charAt(0).toUpperCase() + clickedId.slice(1));
    $('#description').text(descriptions[clickedId]);
    // changing background - doesn't work
    //$(this).find('.jumbotron').css('background', 'linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)), url(' + images[clickedId] + ')');
    $('.jumbotron').css({
        'background': 'linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)),url(' + images[clickedId] + ')',
        'background-repeat': 'repeat',
        'background-position': 'center center, center',
        'color': '#FFF'
    });

    if (clickedId === 'explore') {
        load('/api/items?category=');
    } else if (clickedId === 'medical') {
        load('/api/items?category=medical');
    } else if (clickedId === 'animals') {
        load('/api/items?category=animals');
    } else if (clickedId === 'culture') {
        load('/api/items?category=culture');
    } else if (clickedId === 'other') {
        load('/api/items?category=other');
    }
});

var load = function(url) {
    requester.get(url)
        .then(updateHTML)
        .catch((err) => {
            console.log('--- GET URL ERROR ---' + err);
        })
};

var updateHTML = function(html) {
    $('#projects').html(html);
};
