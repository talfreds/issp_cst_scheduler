const bodyParser = require('body-parser');
const express = require('express');
const config = require('./db_config.js');
const util = require("util");
var mysql = config.mysql;

var connection = config.connection;

var app = express();

const helmet = require("helmet");
app.use(helmet());

// scheduler sends application/x-www-form-urlencoded requests,
app.use(bodyParser.urlencoded({ extended: true })); 

// you'll need these headers if your API is deployed on a different domain than a public page 
// in production system you could set Access-Control-Allow-Origin to your domains
// or drop this expression - by default CORS security is turned on in browsers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

// return static pages from "./public" directory
app.use(express.static(__dirname + "/public"));

const router = require("./router");

// open connection to mysql
const connectionPool = mysql.createPool(connection);
connectionPool.query = util.promisify(connectionPool.query);

// add listeners to basic CRUD requests
const Storage = require("./storage");
const eventsStorage = new Storage(connectionPool);
router.setRoutes(app, "/events", eventsStorage);

// add listeners to basic CRUD with recurring events support
const RecurringStorage = require("./storage_recurring");
const recurringEventsStorage = new RecurringStorage(connectionPool);
router.setRoutes(app, "/recurring_events", recurringEventsStorage)

// why isnt this an arrow function?
// dont ask me
connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Connected to database with id: ' + connection.threadId);
    console.log('hi from quinton');
});


var get_credentials = (input_email) => {
    console.log(input_email);
    return new Promise((resolve, reject) => {
        var query = `SELECT * FROM ba_users WHERE user = ` + connection.escape(input_email);

        connection.query(query, function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult)
            }
        });
    });
}

var get_instructors = () => {
    return new Promise((resolve, reject) => {
        var query = `SELECT instructorLastName, instructorFirstName FROM instructor`;

        connection.query(query, function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult)
            }
        });
    });
}


module.exports = {
    get_credentials,
    get_instructors
};