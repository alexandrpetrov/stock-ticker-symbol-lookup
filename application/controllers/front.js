const dataService = require('../services/data.service.js');
const logger = require("../services/log.service.js");

class Front {
    async symbol(sym) {
        const data = await dataService.get(sym);
        if(data) {
            logger.add("Success. Response successfully generated" );
            return {
                statusCode: 200,
                content : data
            };
        }
        else {
            return {
                statusCode: 400,
                content : "Something went wrong when executing your request. Please make sure you're sending correct data and try again"
            }
        }
    }
}
module.exports = Front;