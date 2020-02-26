const fs = require('fs');
const logger = require('./log.service.js');
const dateHelper = require('../helpers/date.helper.js');
var path = require('path');
const CONFIG_FILE = "/.env";

class ConfigService {
    constructor(){
        if(! ConfigService.instance){
            this.read();
            ConfigService.instance = this;
        }
        return ConfigService.instance;
    }

    read() {
        const appRoot = path.dirname(require.main.filename);
        try {
            let data = fs.readFileSync(appRoot + CONFIG_FILE).toString().split("\n");
            this._storage = {};
            for(let item in data) {
                let [key, value] = (data[item]).split("=");
                if(key && value) {
                    this._storage[key] = value;
                }
                else {
                    throw(new Error("Incorrect configuration file format"));
                }
            }

        }
        catch(error) {
            logger.add(dateHelper.getFormattedDate());
            logger.add("Execution terminated with configuration error: " + error.message);
            logger.write();
        }
    }

    get(key) {
        try {
            if(key in this._storage) {
                return this._storage[key];
            }
            else {
                throw(new Error("Incorrect configuration file format"));
            }
        }
        catch(error) {
            logger.add("An error has been encountered: " + error.message);
            return null;
        }
    }
}
const instance = new ConfigService();
module.exports = instance;