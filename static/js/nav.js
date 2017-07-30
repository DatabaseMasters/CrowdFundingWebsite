/* globals $ requester */
// Function to make current page nav tab active
$(document).ready(function() {
    // $('[data-toggle="popover"]').popover('show');

    $('#myModal').modal();

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
            $('#main').html(response);
        });
}

$('#search-submit').on('click', function(event) {
    var value = $("input[name='searchValue']").val().trim();
    var options = { data: { searchValue: value } };
    loadSerachResults(options);
})

// Function to prevent code injection

function preventScripts(textInput) {
    return $('<div>').text(textInput).html();
    //return textInput.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Funciton to subscribe to newsletter

function subscribe(options) {
    requester.post('/api/subscribe', options, true)
        .then(function(response) {
            $('#subscribe-email')
                .attr('data-content', response.message)
                .popover('show');

            setTimeout(function() {
                $('#subscribe-email').popover('hide');
            }, 2000);
        })
        .catch(function(err) {
            console.log('--- Error with subscribing ---');
            console.log(err);
        });
}

$('#subscribe-form').on('submit', function(event) {
    event.preventDefault();
    var $email = preventScripts($("input[name='email']").val().trim());
    var options = { data: { email: $email } };
    subscribe(options);
})


// Function to send feedback 

function sendEmail(options) {
    requester.post('/api/feedback', options, true)
        .then(function(response) {
            $('#contact-modal').modal('hide');
            $('#flash-response').html(response);
            $('#myModal').modal('show');
        })
        .catch(function(err) {
            console.log('--- Error with sending contact form ---');
            console.log(err);
        });
}

$('#contact-modal').on('submit', function(event) {
    event.preventDefault();
    var $sender = preventScripts($('#sender-name').val().trim());
    var $subject = preventScripts($('#subject-text').val().trim());
    var $message = preventScripts($('#message-text').val().trim());

    var options = {
        data: {
            sender: $sender,
            subject: $subject,
            message: $message,
        }
    };
    //if ($sender !== '' && $subject !== '') {
    sendEmail(options);
    //};
})
