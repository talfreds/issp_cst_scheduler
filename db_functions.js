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

var getAllGeneral = (tablename) => {
    console.log(tablename);
    return new Promise((resolve, reject) => {
        var query = `SELECT * FROM ${tablename}`;
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
        var query = `select courseID, Type, site, startTime from classroomcourse join coursetype on coursetype.courseTypeID = classroomcourse.courseTypeID join classroom on classroomcourse.classroomID = classroom.classroomID;`;
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

var get_this_instructor = (obj) => {
    console.log('get_this_instructor obj: ', obj.Instructors)

    return new Promise((resolve, reject) => {
        var query = `SELECT * FROM instructor WHERE instructorID = ` + connection.escape(obj.Instructors);

        connection.query(query, function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult)
            }
        });
    })
}


var get_learners = () => {
    return new Promise((resolve, reject) => {
        var query = `SELECT learnerID, learnerFirstName, learnerLastName FROM learner`;
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
    var objKeys = []
    var objvalues = []

    for (var i = 1; i < 4; i++) {
        objKeys.push(Object.keys(obj)[i]);
        objvalues.push(Object.values(obj)[i]);
    }
    objKeys.push(Object.keys(obj).slice(-2, -1)[0])
    objvalues.push(Object.values(obj).slice(-2, -1)[0])

    return new Promise((resolve, reject) => {
        var query = `INSERT INTO instructor (${objKeys}) VALUES (?,?,?,?)`
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

var updateInstructor = (obj) => {
    var objKeys = []
    var objvalues = []
    for (var i = 1; i < 4; i++) {
        objKeys.push(Object.keys(obj)[i]);
        objvalues.push(Object.values(obj)[i]);
    }

    objKeys.push(Object.keys(obj).slice(-3, -2)[0])
    objvalues.push(Object.values(obj).slice(-3, -2)[0])

    return new Promise((resolve, reject) => {
        var query = `UPDATE instructor SET instructorLastName =?, instructorFirstName =?, instructorEmail = ?, comments=? where instructorID = ` + connection.escape(obj.instructorID)
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


var insertInstructorAvailability = (obj) => {
    if (Object.keys(obj).length <= 6) {
        return Promise.resolve();
    }
    var keys = [];
    var values = [];

    for (i = 0; i < Object.keys(obj).length - 6; i++) {
        keys.push(Object.keys(obj)[i + 4])
        values.push(Object.values(obj)[i + 4])
    }

    keys.push('instructorID');

    var values_vars = ',?'.repeat(keys.length - 2);

    return new Promise((resolve, reject) => {
        var query = `INSERT INTO instructoravailabledays (${keys}) VALUES (?` + values_vars + `,(select instructorID from instructor where instructorEmail=${connection.escape(Object.values(obj)[3])}))`
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

var updateInstructorAB = (obj) => {
    console.log('ab day:', obj)
    var keys = [];
    var values = [];
    console.log('length: ', Object.keys(obj).length - 7)
    for (i = 0; i < Object.keys(obj).length - 7; i++) {
        keys.push(Object.keys(obj)[i + 4])
        values.push(Object.values(obj)[i + 4])
    }

    keys.push('instructorID');
    values.push(obj.instructorID)
    var values_vars = ',?'.repeat(keys.length - 1);
    console.log('inid:', connection.escape(obj.instructorID))
    return new Promise((resolve, reject) => {
        var query = `REPLACE INTO instructoravailabledays (${keys}) VALUES (?` + values_vars + `)`
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

var get_instructors_ab_day = (obj) => {
    return new Promise((resolve, reject) => {
        var query = `select * from instructoravailabledays  where instructorID = ` + connection.escape(obj.Instructors);
        connection.query(query, function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult)
            }
        });
    });
}

var insertInstructorDays = (obj, tablename) => {

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
        console.log('updeate iday: ', obj)
        var start = Object.keys(obj)[1]
        var end = Object.keys(obj)[2]
        var comments = Object.keys(obj)[3]
        return new Promise((resolve, reject) => {


            startdays = Object.values(obj)[1]
            enddays = Object.values(obj)[2]
            newComments = Object.values(obj)[3]

            if (typeof(newComments) == "string") {
                for (var i = 0; i < startdays.length; i++) {

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
            } else {
                for (var i = 0; i < startdays.length; i++) {

                    obj[start] = startdays[i]
                    obj[end] = enddays[i]
                    obj[comments] = newComments[i]



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

var get_data_from_database = (sqlquery, param) => {
    return new Promise((resolve, reject) => {
        var query = sqlquery + connection.escape(param)
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

var assign_instructor_session = (obj) => {
    console.log(obj);

    var values_vars = ',?'.repeat(Object.keys(obj).length - 1);

    return new Promise((resolve, reject) => {
        var query = `UPDATE classroomcourserecord SET instructorID = ${obj.Instructors} WHERE courseRecordID = ${obj.Sessions}`;
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

var assign_learner_session = (obj) => {
    console.log(obj);

    var values_vars = ',?'.repeat(Object.keys(obj).length - 1);

    return new Promise((resolve, reject) => {
        var query = `UPDATE classroomcourserecord SET learnerID = ${obj.Learners} WHERE courseRecordID = ${obj.Sessions}`;
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

// var updateGeneralData = (obj, tablename) => {
//     console.log(obj)

//     var values_vars = ',?'.repeat(Object.keys(obj).length - 1);

//     return new Promise((resolve, reject) => {
//         var query = `REPLACE INTO ` + tablename + ` (${Object.keys(obj)}) VALUES (?` + values_vars + `)`
//         var values = Object.values(obj)
//         connection.query(query, values, function(err, queryResult, fields) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(queryResult);
//                 console.log("Number of records inserted: " + queryResult.affectedRows);
//             }
//         });
//     })
// }

var updateGeneralData = (obj, tablename) => {
    console.log(obj)

    var values_vars = ',?'.repeat(Object.keys(obj).length - 1);

    return new Promise((resolve, reject) => {
        var query = `INSERT INTO ` + tablename + ` (${Object.keys(obj)}) VALUES (${connection.escape(Object.values(obj))}) ON DUPLICATE KEY UPDATE `;
        for (i = 0; i < Object.keys(obj).length; i++) {
            if (i == 0) {
                query = query + Object.keys(obj)[i] + ' = ' + connection.escape(Object.values(obj)[i]);
            } else {
                query = query + ', ' + Object.keys(obj)[i] + ' = ' + connection.escape(Object.values(obj)[i]);
            }
        }
        query = query + ';';
        console.log(query);
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


var deleteGeneralData = (obj, tablename) => {
    console.log(obj)

    return new Promise((resolve, reject) => {
        var values = Object.values(obj)
        var query = `DELETE FROM ` + tablename + ` WHERE ${Object.keys(obj)[0]} = ` + values[0]
        console.log(query);
        connection.query(query, function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult);
                console.log("Number of records inserted: " + queryResult.affectedRows);
            }
        });
    })
}

var deleteDualPK = (obj, tablename) => {

    return new Promise((resolve, reject) => {
        var values = Object.values(obj)
        var query = `DELETE FROM ` + tablename + ` WHERE ${Object.keys(obj)[0]} = ` + values[0] + ` and ${Object.keys(obj)[1]} = ` + values[1];
        console.log(query);
        connection.query(query, function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult);
                console.log("Number of records inserted: " + queryResult.affectedRows);
            }
        });
    })
}

var getClassroomSession = (obj) => {
    return new Promise((resolve, reject) => {
        var query = `SELECT courseID, startTime, endTime, classroomID FROM classroomcourse WHERE courseID = ${obj.courseID}`;
        connection.query(query, function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult)
            }
        });
    });
}

var getSessionList = () => {
    return new Promise((resolve, reject) => {
        var query = `select courseID,Type,site,classroomName, startTime from classroomcourse join coursetype on classroomcourse.courseTypeID = coursetype.courseTypeID join classroom on classroom.classroomID = classroomcourse.classroomID;`;
        connection.query(query, function(err, queryResult, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(queryResult)
            }
        });
    });
}

var getEditLearner = (obj) => {
    return new Promise((resolve, reject) => {
        var query = `SELECT learnerLastName, learnerFirstName, learnPrimaryEmail, otherEmail, specialty, role, comments FROM learner WHERE learnerID = ${obj.Learners}`;
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
    deleteDualPK,
    get_credentials,
    get_instructors,
    get_this_instructor,
    get_instructors_ab_day,
    get_learners,
    get_data_from_database,
    insertClassroom,
    insertInstructor,
    updateInstructor,
    insertInstructorAvailability,
    updateInstructorAB,
    insertInstructorDays,
    get_instructor_schedules,
    get_instructors_in_session,
    insertGeneralData,
    deleteGeneralData,
    updateGeneralData,
    get_KLRs,
    assign_instructor_session,
    assign_learner_session,
    get_all_instructors_teaching_day,
    getAllGeneral,
    getEditLearner,
    getClassroomSession,
    getSessionList
};