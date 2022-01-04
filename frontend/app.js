$(document).ready(function () {
    function getAllMessages() {
        $.ajax({
            url: "http://localhost:8080/api/messages/get",
            method: "GET",
            context: document.body,
        }).done(function (data) {
            console.log(data)
            var messages = "";
            $.each(data, function (index, val) {
                messages += `
                <div class="message">
                    <div class="user">${val.user.name}</div>
                    <div class="text">${val.text}</div>
                </div>
           `
            })
            $("#messages").html(messages)
        })
    }

    getAllMessages()

    $("#send_button").click(function () {
        $.ajax({
            url: "http://localhost:8080/api/messages/create",
            method: "POST",
            context: document.body,
            data: {
                "userId": 1,
                "text": $("#input_message").val()
            }
        }).done(function (data) {
            console.log(data)
            getAllMessages()
        });
        $('#input_message').val('');
    })

    $.ajax({
        url: "http://localhost:8080/api/users/get",
        method: "GET",
        context: document.body,
    }).done(function (data) {
        console.log(data)
        var users = "";
        $.each(data, function (index, val) {
            users += `
                <div class="user">
                    <div class="name">${val.name}</div>
                    <div class="login">${val.login}</div>
                </div>
           `
        })
        $("#users").html(users)
    })

});


