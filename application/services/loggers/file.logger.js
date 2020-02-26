const fs = require('fs');
const path = require('path');
const config = require('../config.service.js');

//TODO: this probably needs to be changed to be able to run concurently using background queue
class FileLogger {
    constructor(){
        if(! FileLogger.instance){
            this.log_file = path.dirname(require.main.filename) + config.get("LOG_FILE");
            FileLogger.instance = this;
        }
        return FileLogger.instance;
    }

    log(message) {
        try {
            fs.appendFileSync(this.log_file, message);
        }
        catch(error) {
            console.log("Error occured while trying to write to logfile: " + error.message);
        }
    }
}

const instance = new FileLogger();
module.exports = instance;