// function to rotate the dropdown menu arrow up/down on click

jQuery.fn.rotate = function(degrees) {
    $(this).find('.glyphicon-chevron-down').css({
        'transform': 'rotate(' + degrees + 'deg)',
        'transition': 'all 0.5s ease',
    });
    return $(this);
};

$('.dropdown').on('show.bs.dropdown', function() {
    $(this).rotate(-180);
});

$('.dropdown').on('hide.bs.dropdown', function() {
    $(this).rotate(0);
});
