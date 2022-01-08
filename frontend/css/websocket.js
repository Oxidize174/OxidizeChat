let ws;

var showMessage = console.log

const websocket = {
    connect: function () {
        if (ws) {
            ws.onerror = ws.onopen = ws.onclose = null;
            ws.close();
        }

        ws = new WebSocket(API_WEBSOCKET);
        ws.onerror = function () {
            showMessage('WebSocket error');
        };

        ws.onopen = function () {
            showMessage('WebSocket connection established');
        };

        ws.onclose = function () {
            showMessage('WebSocket connection closed');
            ws = null;
        };

        ws.onmessage = function (event) {
            try {
                const parsed = JSON.parse(event.data)
                switch (parsed.type) {
                    case 'message:get':
                        appendMessagesHTML([parsed.params])
                }
                console.log('onmessage', parsed)
            } catch (e) {
                console.error(e)
            }
        };
    },
    send: function (
        type, // Строковый тип WS-сообщения
        params, // Параметры WS-сообщения
    ) {
        if (!ws) {
            showMessage('No WebSocket connection');
            return;
        }
        ws.send(JSON.stringify({type, params}));
    }
}
