To run locally checkout the repository and run

`docker-compose up -d`

After that the application will be accessible via browser e.g.: 

http://0.0.0.0:3000/symbol/atvi

Curl command to retrieve data from api:

curl http://0.0.0.0:3000/symbol/atvi

###Outstanding Items
1. Implement file logger that would allow interprocess writing to log without concurency issues. I was thinking of creating additional background process with job queue, however I would have liked to use Redis for IPC, but don't know how to use it without npm libs
2. Implement configurable through yml router, but will probably need some yml parsing lib
3. Implement custom date formats in `date.helper.js`
4. Tests  