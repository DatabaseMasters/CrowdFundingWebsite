/* globals $ */
$(document).ready(function () {
    $('.star').on('click', function () {
        $(this).toggleClass('star-checked');
        const toAdd = $(this).hasClass('star-checked');
        const href = $(this).parent().next().find('a.pull-left').attr('href').split('/');
        const projectRef = parseInt(href[href.length - 1], 10);
        
        if (toAdd) {
            requester.put('/auth/favourites', {
                data: {
                    favourites: projectRef,
                }
            }, true).then(function (sth) {
                $('#msg-holder').html(sth);
                $('#myModal').modal();
            });
        } else {
            requester.delete('/auth/favourites', {
                data: {
                    favourites: projectRef,
                }
            }, true).then(function (sth) {
                $('#msg-holder').html(sth);
                $('#myModal').modal();
            });
        }
    });
});
