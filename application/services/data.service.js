const requestHelper = require('../helpers/request.helper.js');
const logger = require('./log.service.js');
const config = require('./config.service.js');
class DataService {
    constructor(){
        if(! DataService.instance){
            DataService.instance = this;
        }
        return DataService.instance;
    }

    async get(symbol) {
        const url = 'https://cloud.iexapis.com/stable/stock/' + symbol + '/batch?types=quote,logo,news&token=' + config.get("IEX_KEY");
        let returnValue = {
            latestPrice: null,
            logo: null,
            news: null,
        };
        try {
            const data = JSON.parse(await requestHelper.get(url));
            //We want to make sure it doesn't break if some of the response items are incomplete or sudden data structure change
            if(typeof(data) === "object") {
                if("quote" in data) {
                    returnValue.latestPrice = "latestPrice" in data.quote ? data.quote.latestPrice : null
                }
                if("logo" in data) {
                    returnValue.logo = "url" in data.logo ? data.logo.url : null;
                }
                if("news" in data) {
                    returnValue.news = Array.isArray(data.news) ? data.news.shift() : null;
                    if(typeof(returnValue.news) === "object") {
                        returnValue.news = "url" in returnValue.news ? returnValue.news.url : returnValue.news;
                    }
                }
            }
        }
        catch (error) {
            logger.add("Execution failure with error: " + error.message);
            return null;
        }
        return JSON.stringify(returnValue);
    }

}
const instance = new DataService();
module.exports = instance;
