const Front = require("./controllers/front.js");
const FourOFour = require("./controllers/fourofour.js");
const url = require('url');
class Router {
    //TODO rework this to read routes from YML configuration
    async route(req, res) {
        let result = "";
        if(req.url.match(/^\/symbol\/[\w\.]+/g)) {
            const pathComponents = url.parse(req.url).pathname.split("/").filter( e => e !== '');
            if(pathComponents.length === 2) {
                const front = new Front();
                result = await front.symbol(pathComponents.pop());
            } else {
                const fourofour = new FourOFour(req);
                result = await fourofour.index(req);
            }
        }
        else {
            const fourofour = new FourOFour(req);
            result = await fourofour.index(req);
        }
        return result;
    }
}

module.exports = Router;

