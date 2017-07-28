$('#updateButton').on('click', () => {
    updateProfile();
});

function updateProfile() {
    const username = getCookie('username');
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
    }, true);
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}