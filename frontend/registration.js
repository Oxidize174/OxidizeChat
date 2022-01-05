$(document).ready(function () {
    $("form").submit(function () {
        $.ajax({
            url: API_BASE + "/user/signup",
            method: "POST",
            context: document.body,
            data: {
                name: $("#name").val(),
                login: $("#login").val(),
                password: $("#password").val()
            }
        }).done(function (data) {
            window.location.href = 'index.html'
        });
        return false;
    })
})