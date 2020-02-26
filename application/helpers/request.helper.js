const http = require('https');
const https = require('https');
const url = require('url');

class RequestHelper {
    constructor(){
        if(! RequestHelper.instance){
            RequestHelper.instance = this;
        }
        return RequestHelper.instance;
    }

    async get(requestUrl) {
        return new Promise((resolve, reject) => {
            const parsedRequestUrl = url.parse(requestUrl);

            const lib = requestUrl.startsWith('https://') ? https : http;
            const method = "GET";
            const port = requestUrl.startsWith('https://') ? 443 : 80;
            const host = parsedRequestUrl.hostname;
            const path = parsedRequestUrl.pathname + parsedRequestUrl.search;

            const options = {
                method,
                host,
                port,
                path,
            };

            const req = lib.request(options, response => {
                if (response.statusCode < 200 || response.statusCode > 299) {
                    reject(new Error('Failed to load remote endpoint, status code: ' + response.statusCode));
                }
                const body = [];
                response.on('data', (chunk) => {
                    body.push(chunk);
                });
                response.on('end', () => {
                    resolve(Buffer.concat(body).toString());
                });
            });
            req.on('error', (err) => {
                reject(new Error("Failed to process request with the following error: " + err.message));
            });
            req.end();
        });
    }

}
const instance = new RequestHelper();
Object.freeze(instance);

module.exports = instance;
