/* globals $ requester */
// Function to make current page nav tab active
$(document).ready(function() {
    // $('[data-toggle="popover"]').popover('show');

    var path = window.location.pathname;
    $('#explore-nav').removeClass('active');
    $('#new-nav').removeClass('active')
    $('#about-nav').removeClass('active');
    $('#profile-nav').removeClass('active');

    if (path === '/projects') {
        $('#explore-nav').toggleClass('active');
    } else if (path.includes('/projects/new')) {
        $('#new-nav').toggleClass('active')
    } else if (path.includes('about')) {
        $('#about-nav').toggleClass('active');
    } else if (path.includes('auth/profile')) {
        $('#profile-nav').toggleClass('active');
    }
});

// Function to get search results

function loadSerachResults(options) {
    requester.get('/api/projects/search', options)
        .then(function(response) {
            console.log('=== GOT RESPONSE ===');
            $('#main').html(response);
        });
}

$('#search-submit').on('click', function(event) {
    var value = $("input[name='searchValue']").val().trim();
    var options = { data: { searchValue: value } };
    loadSerachResults(options);
})

// Funciton to subscribe to newsletter

function subscribe(options) {
    requester.post('/api/subscribe', options, true)
        .then(function(response) {
            console.log('=== GOT RESPONSE ===');
            console.log(response);
            console.log(response.message.includes('Thank you'));

            // Show popover here with content
            var $inputField = $('#subscribe-email')
            $('#subscribe-email').attr('data-content', response.message).popover('show');

            setTimeout(function() {
                $('#subscribe-email').popover('hide');
            }, 2000);
        });
}

$('#subscribe-submit').on('click', function(event) {
    var value = $("input[name='email']").val().trim();
    var options = { data: { email: value } };
    subscribe(options);
})
