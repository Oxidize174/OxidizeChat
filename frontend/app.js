$(document).ready(function () {
    const API_BASE = "http://192.168.1.87:8080/api"

    //отправка сообщений
    $("#send_button").click(function () {
        sendMessage()
    })

    $input = $('#input_message')
    $input.on("keypress", function (event) {
        //keyCode = 13 = ENTER
        if (event.keyCode === 13) {
            sendMessage()
        }
    });

    function sendMessage() {
        const text = $input.val()
        if (!text) {
            return
        }
        $.ajax({
            url: API_BASE + "/messages/create",
            method: "POST",
            context: document.body,
            data: {
                "userMe": 1,
                "userYou": $(".user.active").attr('data-id'),
                "text": text,
            }
        }).done(function (data) {
            getGroupMessages()
            console.log(data)
        });
        $input.val('');
    }

    //Получение пользователей
    $.ajax({
        url: API_BASE + "/users/get",
        method: "GET",
        context: document.body,
    }).done(function (data) {
        console.log(data)
        var users = "";
        $.each(data, function (index, val) {
            users += `
                <div class="user" data-id="${val.id}">
                    <div class="name">${val.name}</div>
                    <div class="login">${val.login}</div>
                </div>
           `
        })
        $("#users").html(users)

        //выбор пользователя
        $(".user").click(function () {
            const $user = $(this)

            $("#controls").removeClass('hidden')
            $(".user").removeClass('active')
            $user.addClass('active')

            //выбор отображения активного пользователя в шапке
            const $name = $($user.find(".name")[0])
            $("#header .header-name").html($name.html())

            getGroupMessages()
        })
    })

    //запрос сообщений с пользователем
    function getGroupMessages() {
        $.ajax({
            url: API_BASE + "/messages/grouped?userMe=" + 1 + "&userYou=" + $(".user.active").attr('data-id'),
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
            const $messages = $("#messages")
            $messages.html(messages)
            $messages.animate({
                scrollTop: $messages[0].scrollHeight
            }, 0);
        })
    }


});


