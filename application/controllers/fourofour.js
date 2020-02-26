const logger = require("../services/log.service.js");

class FourOFour {
    async index(req) {
        logger.add("Error. The requested page doesn't exist" );
        return {
            statusCode: 404,
            content: "Page " + req.url + " doesn't exist"
        }
    }
}
module.exports = FourOFour;