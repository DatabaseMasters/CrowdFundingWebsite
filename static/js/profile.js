$('#updateButton').on('click', function () {
    updateProfile();
});

function updateProfile() {
    const username = $('#profile-name').text();
    const requestUrl = '/api/users/profile/' + username;
    const firstName = $("input[name='firstName']").val().trim();
    const lastName = $("input[name='lastName']").val().trim();
    const email = $("input[name='email']").val().trim();

    requester.put(requestUrl, {
        data: {
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
        },
    }, true)
        .then(function (sth) {
            $('.msg-holder').replaceWith(sth);
            $('#myModal').modal();
        });
}