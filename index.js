const express = require('express')
const http = require('http')
const fs = require('fs')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const logger = require('./app/libs/loggerLib')
const appConfig = require('./config/appConfig')

const helmet = require('helmet')

const app = express();
const port = process.env.PORT || appConfig.port;

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cookieParser())

app.use(helmet())

// Bootstrap Routes
let routesPath = './app/routes';
fs.readdirSync(routesPath).forEach(function (file) {

    if (~file.indexOf('.js')) {

        let route = require(routesPath + '/' + file);
        route.setRouter(app);

    }

}); // end of Bootstrap Routes

// Bootstrap models
let modelsPath = './app/models';
fs.readdirSync(modelsPath).forEach(function (file) {

    if (~file.indexOf('.js')) require(modelsPath + '/' + file)

}) // end of Bootstrap models

/**
 * create http server
 */
const server = http.createServer(app)
// start listening to http server
console.log(appConfig)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
// end of listening code

/**
 * Event listener for http server "error" event
 */

function onError(error) {

    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not rqual listen', 'serverOnErrorHandler', 10);
        throw error
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    ('Listening on ' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
    let db = mongoose.connect(appConfig.db.uri, {
        useNewUrlParser: true
    })
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})

// handing database connection here
mongoose.connection.on('error', function (err) {

    console.log('database connection error');
    console.log(err);

}) // end mongoose connection error

// handling mongoose success event
mongoose.connection.on('open', function (err) {

    if (err) {

        console.log('database error');
        console.log(err);

    } else {

        console.log('database connection open success');

    }

}); // end mongoose connection open handler
