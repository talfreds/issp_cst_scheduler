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

var get_instructors_in_session = () => {
    return new Promise((resolve, reject) => {
        // var query = `SELECT courseName, courseRecordID FROM classroomcourserecord group by courseName`;
        var query = `SELECT courseName, courseRecordID FROM classroomcourserecord`;
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

var insertClassroom = (obj)=>{
    console.log(obj)
    obj.capacity = parseInt(Object.values(obj)[3])
    obj.Projector = obj.Projector ? true:false
    obj.ProjectorScreen = obj.ProjectorScreen? true : false

    
    return new Promise((resolve,reject)=>{
        var query = `INSERT INTO classroom (${Object.keys(obj)}) VALUES (?,?,?,?,?,?,?)`
        var values = Object.values(obj)
        connection.query(query,values, function(err, queryResult, fields) {
        if (err) {
            reject(err);
        } else {
            resolve(queryResult);
            console.log("Number of records inserted: " + queryResult.affectedRows);
        }
        });
        })
    }

var insertInstructor = (obj)=>{
    console.log('beginning: ',Object.keys(obj))
    var objKeys = []
    var objvalues = []
    
    for(var i = 0;i<4;i++){
        objKeys.push(Object.keys(obj)[i]);
        objvalues.push(Object.values(obj)[i]);
    }
    objKeys.push(Object.keys(obj).pop())
    objvalues.push(Object.values(obj).pop())

    return new Promise((resolve,reject)=>{
        var query = `INSERT INTO instructor (${objKeys}) VALUES (?,?,?,?,?)`
        connection.query(query,objvalues, function(err, queryResult, fields) {
        if (err) {
            reject(err);
        } else {
            resolve(queryResult);
            console.log("Number of records inserted: " + queryResult.affectedRows);
        }
        });
        })
    }

var insertInstructorCourses = (obj)=>{
    console.log(typeof(Object.values(obj)[4]))
    var query = `INSERT INTO instructorCourses (courses,instructorID) VALUES (?,(select instructorID from instructor where instructorEmail=${connection.escape(Object.values(obj)[3])}))`
    if (typeof(Object.values(obj)[4]) == "string"){
        
        return new Promise((resolve,reject)=>{
             
            connection.query(query,Object.values(obj)[4],
            function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult);
                console.log("Number of records inserted: " + queryResult.affectedRows);
            }
            });
            })
        }else{ 
            return new Promise((resolve,reject)=>{
               
                for (var i=0;i<Object.values(obj)[4].length;i++){
                    connection.query(query,Object.values(obj)[4][i],
                    function(err, queryResult, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(queryResult);
                        console.log("Number of records inserted: " + queryResult.affectedRows);
                    }
                }
                
            ) }
        })
    }
}

    


var get_instructor_schedules = (instructor_id) => {
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
    insertClassroom,
    insertInstructor,
    insertInstructorCourses,
    get_instructor_schedules,
    get_instructors_in_session
};