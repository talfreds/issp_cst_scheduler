const bodyParser = require('body-parser');
const express = require('express');
const config = require('./db_config.js');
const util = require("util");
var mysql = config.mysql;

var connection = config.connection;

var app = express();


// why isnt this an arrow function?
// dont ask me
connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database with id: ' + connection.threadId);
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
        var query = `SELECT instructorID, instructorLastName, instructorFirstName FROM instructor`;

        connection.query(query, function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult)
            }
        });
    });
}


var get_instructor_schedules = (instructor_id) => {
    instructor_id = 2;
    return new Promise((resolve, reject) => {
        var query = `SELECT startTime AS start_date, endTime AS end_date, comments AS text FROM classroomcourserecord WHERE instructorID = ` + connection.escape(instructor_id);
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
    get_instructors,
    get_instructor_schedules
};