/* globals $ */

// not completed - must change page count
$('#pagination').twbsPagination({
    totalPages: 35,
    visiblePages: 5,
    onPageClick: function(event, page) {
        $('#pageNum').text('Page ' + page);
    }
});
