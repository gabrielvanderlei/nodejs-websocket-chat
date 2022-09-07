
class WSProcessMessage {
    constructor(){
        this.wsUsers = [];
        this.messages = [];
        this.eventEmitter = {};
    }

    on(eventEmitterName, fn){
        if(!this.eventEmitter[eventEmitterName]) this.eventEmitter[eventEmitterName] = [];
        this.eventEmitter[eventEmitterName].push(fn);
    }

    emit(eventEmitterName, data){
        if(!this.eventEmitter[eventEmitterName]) this.eventEmitter[eventEmitterName] = [];
        this.eventEmitter[eventEmitterName].map((fn) => fn(data))
    }

    addWS(ws) {
        this.wsUsers.push(ws);
    }

    getMessages(){
        return this.messages;
    }
    
    loadOldMessages(fn){
        this.messages.map(message => fn(message));
    }

    sendToAllUsers(message) {
        this.emit("message", message);

        this.wsUsers.map(ws => {
            ws.send(JSON.stringify(message));
        })
    }
    
    sendToUser(message, ws) {
        this.emit("privateMessage", message);
        ws.send(JSON.stringify(message));
    }

    processMessage (message, ws) {
        let messageObject = {};

        try {
            messageObject = JSON.parse(message.toString());    
        } catch(e) {
            console.log(e)
        }

        switch(messageObject.action){
            case 'SEND_MESSAGE_TO_ALL':
                this.actionSendMessageToAll(messageObject)
                break;
            case 'SEND_MESSAGE_TO_USER':
                this.actionSendMessageToUser(messageObject, ws)
                break;
        }
    }

    actionSendMessageToAll ({ username, message }) {
        this.messages.push({ username, message });

        this.sendToAllUsers({
            username,
            message
        })
    }
    
    actionSendMessageToUser ({ username, message }, ws) {
        this.sendToUser({
            username,
            message
        }, ws)
    }

}

module.exports = { WSProcessMessage }