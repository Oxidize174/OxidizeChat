$(document).ready(function () {
    $("form").submit(function () {
        $.ajax({
            url: API_BASE + "/user/signin",
            method: "POST",
            data: {
                login: $("#login").val(),
                password: $("#password").val()
            },
        }).done(function (data) {
            window.location.href = 'chat.html'
        });
        return false;
    })
})
