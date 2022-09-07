var WebSocketServer = require('ws').Server;

class ChatServer {
    constructor(processWS, chatPort, chatPath){
        const wss = new WebSocketServer({
            port: chatPort,
            path: chatPath
        });

        wss.on('connection', function (ws) {
            processWS.addWS(ws)

            processWS.loadOldMessages((message) => {
                processWS.actionSendMessageToUser(message, ws);
            });

            ws.on('message', function (message) {
                processWS.processMessage(message, ws);
            });
        });
    }
}

module.exports = { ChatServer }