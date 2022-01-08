const WebSocket = require('ws');
const wsController = require('../controllers/websocket.controller');

module.exports = ({server, sessionParser}) => {
    const clients = {};

    //
    // Create a WebSocket server completely detached from the HTTP server.
    //
    const wss = new WebSocket.Server({clientTracking: false, noServer: true});

    server.on('upgrade', function (request, socket, head) {
        sessionParser(request, {}, function () {
            const passport = request.session.passport
            if (!passport || !passport.user) {
                socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
                return;
            }
            wss.handleUpgrade(request, socket, head, function (ws) {
                wss.emit('connection', ws, request);
            });
        });
    });

    wss.on('connection', function (ws, request) {
        const currentUserId = Number(request.session.passport.user.id);

        // Сохраняем сокет новой коннекции
        clients[currentUserId] = ws

        ws.on('message', async function (data) {
            if (data) {
                try {
                    // Парсим JSON данные и проверяем, что все данные присланы (и тип, и параметры)
                    const parsedData = JSON.parse(data);
                    console.log('[WS] GET:', parsedData)
                    const type = parsedData.type
                    const params = parsedData.params
                    if (!type || !params) {
                        return
                    }
                    // Проверяем тип данных и в зависимости от него производим определенные действия
                    switch (type) {
                        case 'message:send':
                            // Создаем сообщение в Базе Данных
                            const companionUserId = Number(params.companionUser)
                            const createdMessage = await wsController.createMessage(
                                params.text,
                                currentUserId,
                                companionUserId,
                            )
                            if (createdMessage) {
                                // Преобразовываем в JSON ответные данные клиенту
                                const resultJSON = JSON.stringify({
                                    type: 'message:get',
                                    params: createdMessage,
                                })
                                // Отправляем сообщение текущему пользователю
                                ws.send(resultJSON);
                                // Отправляем сообщение компаньону
                                if (companionUserId !== currentUserId) { // Не нужно отправлять текущему пользователю 2 раза
                                    const companionWS = clients[companionUserId]
                                    if (companionWS) {
                                        // Если сокет найден (компаньон в сети), то отправляем ему сообщение по сокету
                                        companionWS.send(resultJSON)
                                    }
                                }
                            }
                    }
                } catch (e) {
                    console.log(`WS: Invalid JSON.`, e);
                    return;
                }
            }
        });

        ws.on('close', function () {
            delete clients[currentUserId]
        });
    });

}
