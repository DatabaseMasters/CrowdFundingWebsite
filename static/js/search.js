/* globals $ */
$(document).ready(function () {

    // TODO: Make checking the star save it to favourites
    $('.star').on('click', function () {
        $(this).toggleClass('star-checked');
        // some magic happening to get project ref
        const toAdd = $(this).hasClass('star-checked');
        const href = $(this).parent().next().find('a.pull-left').attr('href').split('/');
        const projectRef = href[href.length - 1];
        console.log(projectRef);
        requester.put('/auth/add-to-favourites', {
            data: {
                favourites: projectRef,
            }
        }, true).then(function (sth) {
            $('#msg-holder').replaceWith(sth);
            $('#myModal').modal();
        });
        console.log(projectRef);
    });
});
