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

var get_session_categories = () => {
    return new Promise((resolve, reject) => {
        var query = `SELECT courseTypeID, Type FROM coursetype`;

        connection.query(query, function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult)
            }
        });
    });
}

var get_KLRs = () => {
    return new Promise((resolve, reject) => {
        var query = `SELECT klrID, klrName FROM KLR`;

        connection.query(query, function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult)
            }
        });
    });
}

var insertClassroom = (obj, tablename) => {
    console.log(obj)
    obj.capacity = parseInt(Object.values(obj)[3])
        // obj.Projector = obj.Projector ? true : false
        // obj.ProjectorScreen = obj.ProjectorScreen ? true : false

    var values_vars = ',?'.repeat(Object.keys(obj).length - 1);

    return new Promise((resolve, reject) => {
        var query = `INSERT INTO ` + tablename + ` (${Object.keys(obj)}) VALUES (?` + values_vars + `)`
        var values = Object.values(obj)
        connection.query(query, values, function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult);
                console.log("Number of records inserted: " + queryResult.affectedRows);
            }
        });
    })
}

var insertGeneralData = (obj, tablename) => {
    console.log(obj)

    var values_vars = ',?'.repeat(Object.keys(obj).length - 1);

    return new Promise((resolve, reject) => {
        var query = `INSERT INTO ` + tablename + ` (${Object.keys(obj)}) VALUES (?` + values_vars + `)`
        var values = Object.values(obj)
        connection.query(query, values, function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult);
                console.log("Number of records inserted: " + queryResult.affectedRows);
            }
        });
    })
}

var insertInstructor = (obj) => {
    console.log( Object.keys(obj))
    var objKeys = []
    var objvalues = []

    for (var i = 0; i < 4; i++) {
        objKeys.push(Object.keys(obj)[i]);
        objvalues.push(Object.values(obj)[i]);
    }
    objKeys.push(Object.keys(obj).pop())
    objvalues.push(Object.values(obj).pop())

    return new Promise((resolve, reject) => {
        var query = `INSERT INTO instructor (${objKeys}) VALUES (?,?,?,?,?)`
        connection.query(query, objvalues, function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult);
                console.log("Number of records inserted: " + queryResult.affectedRows);
            }
        });
    })
}

var insertInstructorDays = (obj,tablename) =>{
    
    var query = `INSERT INTO ${tablename} (${Object.keys(obj)}) VALUES (?,?,?,?)`
    if (typeof(Object.values(obj)[1]) == "string") {

        return new Promise((resolve, reject) => {
           
            connection.query(query, Object.values(obj),
                function(err, queryResult, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(queryResult);
                        console.log("Number of records inserted: " + queryResult.affectedRows);
                    }
                });
        })
    } else {
        var start = Object.keys(obj)[1]
        var end = Object.keys(obj)[2]
        return new Promise((resolve, reject) => {
            
            startdays=Object.values(obj)[1]
            enddays=Object.values(obj)[2]
            
            
            for (var i = 0; i<startdays.length ; i++) {
                
                obj[start] = startdays[i]
                obj[end] = enddays[i]
                
                connection.query(query, Object.values(obj),
                    function(err, queryResult, fields) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(queryResult);
                            console.log("Number of records inserted: " + queryResult.affectedRows);
                        }
                    }

                )
            }
        })
    }
 }

var insertInstructorCourses = (obj) => {
    console.log(typeof(Object.values(obj)[4]))
    var query = `INSERT INTO instructorCourses (courses,instructorID) VALUES (?,(select instructorID from instructor where instructorEmail=${connection.escape(Object.values(obj)[3])}))`
    if (typeof(Object.values(obj)[4]) == "string") {
        return new Promise((resolve, reject) => {
            connection.query(query, Object.values(obj)[4],
                function(err, queryResult, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(queryResult);
                        console.log("Number of records inserted: " + queryResult.affectedRows);
                    }
                });
        })
    } else {
        return new Promise((resolve, reject) => {         
            for (var i = 0; i < Object.values(obj)[4].length; i++) {
                connection.query(query, Object.values(obj)[4][i],
                    function(err, queryResult, fields) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(queryResult);
                            console.log("Number of records inserted: " + queryResult.affectedRows);
                        }
                    }

                )
            }
        })
    }
}


var get_all_instructors_teaching_day = (date) => {
    return new Promise((resolve, reject) => {
        var query = `select distinct i.instructorfirstName, i.instructorlastname from instructor i inner join classroomcourserecord ccr on i.instructorID = ccr.instructorID where courseDate = ` + connection.escape(date);
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
    insertInstructorDays,
    get_instructor_schedules,
    get_instructors_in_session,
    insertGeneralData,
    get_session_categories,
    get_KLRs,
    get_all_instructors_teaching_day
};