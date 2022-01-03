$( document ).ready(function() {
    $("#send_button").click(function (){
        $.ajax({
            url: "http://localhost:8080/api/messages/create",
            method: "POST",
            context: document.body,
            data: {
            "userId": 1,
            "text": "Hello!"
            }
        }).done(function(data) {
            console.log(data)
        });
    } )

});


