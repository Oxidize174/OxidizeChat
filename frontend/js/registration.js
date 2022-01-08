$(document).ready(function () {
    $("form").submit(function () {
        $.ajax({
            url: API_BASE + "/user/signup",
            method: "POST",
            data: {
                name: $("#name").val(),
                login: $("#login").val(),
                password: $("#password").val()
            }
        }).done(function (data) {
            window.location.href = 'chat.html'
        }).catch(function (err) {
            if (err.status === 400) {
                $("#error").html(err.responseJSON.message).removeClass("hidden")
            }
        });

        return false;
    })
})
