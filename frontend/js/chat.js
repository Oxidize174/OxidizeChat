let currentUser;

$(document).ready(function () {

    websocket.connect()

    $.ajax({
        url: API_BASE + "/user/current",
        method: "GET"
    }).done(function (data) {
        currentUser = data
    })

    //отправка сообщений
    $("#send_button").click(function () {
        sendMessage()
    })

    const $input = $('#input_message')
    $input.on("keypress", function (event) {
        //keyCode = 13 = ENTER
        if (event.keyCode === 13) {
            sendMessage()
        }
    });

    //выход из чата
    $("#exit").click(function () {
        $.ajax({
            url: API_BASE + "/user/logout",
            method: "POST"
        }).done(function () {
            window.location.href = 'login.html'
        })
    })

    function sendMessage() {
        const text = $input.val()
        if (!text) {
            return
        }
        $input.val('');

        websocket.send(
            'message:send',
            {
                companionUser: $(".user.active").attr('data-id'),
                text: text,
            }
        )
    }

    //Получение пользователей
    $.ajax({
        url: API_BASE + "/users/get",
        method: "GET",
    }).done(function (data) {
        let users = "";
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

            $('#messages').html('') // Очищаем предыдущие сообщения (потому что новые добавляются в конец)

            $("#controls").removeClass('hidden')
            $(".user").removeClass('active')
            $user.addClass('active')

            //выбор отображения активного пользователя в шапке
            const $name = $($user.find(".name")[0])
            $("#header .header-name").html($name.html())

            getGroupMessages()
        })
    }).catch(function (err) {
        if (err.status === 401) {
            window.location.href = 'login.html'
        }
    })
});


function appendMessagesHTML(messagesArray) {
    let html = "";
    $.each(messagesArray, function (index, message) {
        message.createdAt = undefined;
        const date = new Date(message.createdAt);

        let resultDate = date.toLocaleString("ru", {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });


        html += `
            <div class="message ${currentUser.id === message.userFrom ? "my-message" : "companion-message"}">
                <div class="text">${message.text}</div>
                <div class="date">${resultDate}</div>
                </div>
        `
    })

    const $messages = $("#messages")
    $messages.append(html) // Используем append, чтобы добавить сообщения в конец
    $messages.animate({
        scrollTop: $messages[0].scrollHeight
    }, 0);
}

//запрос сообщений с пользователем
function getGroupMessages() {
    $.ajax({
        url: API_BASE + "/messages/grouped?companionUser=" + $(".user.active").attr('data-id'),
        method: "GET",
    }).done(function (data) {
        appendMessagesHTML(data)
    }).catch(function (err) {
        if (err.status === 401) {
            window.location.href = 'login.html'
        }
    })
}


