$(document).ready(function () {
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
                    <div class="user">${val.userId}</div>
                    <div class="text">${val.text}</div>
                </div>
           `
        })
        $("#messages").html(messages)
    })

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
        });

    })

});


