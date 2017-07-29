// Function to make current page nav tab active
$(document).ready(function() {

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
