const http = require('http');
const Router = require('./router.js');
const fileLogger = require('./services/loggers/file.logger.js');
const logger = require('./services/log.service.js');
logger.setLogger(fileLogger);
const dateHelper = require('./helpers/date.helper.js');

const server = http.createServer(async (req, res) =>
{
    const router = new Router();
    logger.add(dateHelper.getFormattedDate());
    logger.add("Requested URL " + req.url);
    result = await router.route(req);

    if(result.statusCode < 400) {
        res.writeHead(result.statusCode, result.headers);
        res.write(result.content);
        res.end();
    }
    else {
        res.statusCode = result.statusCode;
        res.end(result.content);
    }
    logger.write();
}).listen(8080);