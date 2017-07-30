/* globals $ requester clientRouter*/

function donate(value, projectRef) {
    var options = {
        data: {
            donation: value,
            project: projectRef
        }
    };

    // Get processed html, change title, change projects
    return requester.post('/api/donate', options)
        .then(function (response) {
            if (response.redirect) {
                var href = window.location.href;
                var newhref = href.substring(0, href.indexOf('/'));
                newhref += response.redirecturl;
                window.location.href = newhref;
            }

            if (response.updatedAmount) {
                updateProgressBar(response.updatedAmount, response.total);
            }
            showMessage(response.message);
        });
}

function updateProgressBar(updatedAmount, total) {
    var target = parseInt(total).toLocaleString();
    var donatedsofar = parseInt(updatedAmount).toLocaleString();
    var percentage = parseFloat(updatedAmount) / parseFloat(total) * 100;

    var $progressBar = $('.progress-bar');
    $progressBar.attr('aria-valuenow', percentage);
    $progressBar.css({ 'width': `${percentage}%` });

    var $progressType = $('.progress-type');
    $progressType.html(`$${donatedsofar} / $${target}`);

    var $progressCompleted = $('.progress-completed');
    $progressCompleted.html(`${percentage.toFixed(2)}%`);
}

function showMessage(msg) {

}

$('#donation-table').on('click', function (event) {
    var $target = $(event.target);

    if (!$target.hasClass('btn')) {
        return;
    }

    var value = $target.attr('value');
    var url = window.location.href;
    var projectRef = parseInt(url.substr(url.lastIndexOf('/') + 1), 10)
    donate(value, projectRef);
})