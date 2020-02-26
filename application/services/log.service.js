const https = require('https');
const requestHelper = require('../helpers/request.helper.js');

class LogService {
    constructor(logger = console){
        this._messages = [];
        this.setLogger(logger);
    }

    setLogger(logger = console) {
        this._logger = console;
        //We don't want to instantiate logger with something other than valid logger
        if(typeof(logger) === "object") {
            if("log" in logger) {
                if(typeof(logger.log) === "function") {
                    this._logger = logger;
                }
            }
        }
    }

    add(message) {
        this._messages.push(message);
    }

    write() {
        this.add("\n");
        this._logger.log(this._messages.join(" "));
        this._messages = [];
    }
}
const instance = new LogService();
module.exports = instance;