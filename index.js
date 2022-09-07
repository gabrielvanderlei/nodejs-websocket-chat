const { EventSourcingServer } = require('./server/eventSourcing');
const { ChatServer } = require('./server/websockets');
const { FrontStaticServer } = require('./server/front');

const {
    WSProcessMessage
} = require('./lib/wsProcess');

function server(){
    let processWS = new WSProcessMessage();
    new EventSourcingServer(processWS, 9090);
    new ChatServer(processWS, 8080, '/chat');
    new FrontStaticServer(8000);
}

server();