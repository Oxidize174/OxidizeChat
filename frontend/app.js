$(document).ready(function () {
    const API_BASE = "http://192.168.1.87:8080/api"

    function getAllMessages() {
        $.ajax({
            url: API_BASE + "/messages/get",
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

    $("#send_button").click(function () {
        $.ajax({
            url: API_BASE + "/messages/create",
            method: "POST",
            context: document.body,
            data: {
                "userMe": 1,
                "userYou": 2,
                "text": $("#input_message").val()
            }
        }).done(function (data) {
            console.log(data)
            //getAllMessages()
        });
        $('#input_message').val('');
    })

    $.ajax({
        url: API_BASE + "/users/get",
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

        $(".user").click(function () {
            const $name = $($(this).find(".name")[0])
            $("#header .header-name").html($name.html())
            $.ajax({
                url: API_BASE + "/messages/grouped?userMe=" + 1 + "&userYou=" + 2,
                method: "GET",
                context: document.body,
            }).done(function (data) {
                var messages = "";
                $.each(data, function (index, val) {
                    messages += `
                        <div class="message">
                            <div class="user">${val.userFrom}</div>
                            <div class="text">${val.text}</div>
                        </div>
                   `
                })
                $("#messages").html(messages)
            })
        })
    })


});


