const http = require("http");

class EventSourcingServer {
    constructor(processWS, processWSPort){
        http.createServer(function (req, res) {
            console.log('SSE-Server started!');

            res.writeHeader(200, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Access-Control-Allow-Origin": "*"
            });
            
            processWS.loadOldMessages((messageObject) => {
                res.write(`data: ${messageObject.username} | ${messageObject.message}\n\n`);
            });

            processWS.on("message", (messageObject) => {
                res.write(`data: ${messageObject.username} | ${messageObject.message}\n\n`);
            });
        }).listen(processWSPort);
    }
}

module.exports = { EventSourcingServer };