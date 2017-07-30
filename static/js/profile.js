$('#updateButton').on('click', function () {
    const firstName = $("input[name='firstName']").val().trim();
    const lastName = $("input[name='lastName']").val().trim();
    const email = $("input[name='email']").val().trim();
    const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
    }
    updateProfile({data: data});
});

$('#addMoneyButton').on('click', function () {
    const amount = $("input[name='amount']").val().trim();
    const intAmount = parseInt(amount, 10);
    const data = {
        amount: intAmount,
    }
    updateProfile({data: data});
    $("input[name='amount']").val("");
    if(intAmount >= 0){
        $('#current-balance').text(intAmount);
    }
});

function updateProfile(data) {
    const username = $('#profile-name').text();
    const requestUrl = '/api/users/profile/' + username;
    
    requester.put(requestUrl, data, true)
        .then(function (sth) {
            $('.msg-holder').replaceWith(sth);
            $('#myModal').modal();
        });
}