const express = require('express');
const app = express();
        
class FrontStaticServer {
    constructor(frontPort){
        app.use(express.static('./public'));
        app.listen(frontPort, () => console.log("Running frontend"));
    }
}

module.exports = { FrontStaticServer };