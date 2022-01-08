const API_BASE = "http://localhost:8080/api"

$(document).ready(function () {
    $.ajaxSetup({
        context: document.body,
        xhrFields: {
            withCredentials: true
        }
    })
})
