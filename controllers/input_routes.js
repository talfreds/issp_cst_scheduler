const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
    parse
} = require("querystring");
const db_functions = require('../db_functions.js');

router.post("/addSite", (request, response) => {
    console.log(request.body);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });
});



router.post("/addNewLearner", (request, response) => {
    db_functions.insertGeneralData(request.body, 'learner').then((result) => {
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });

    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })
});

router.post("/add_learner_to_courses", (request, response) => {
    console.log(request.body);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });

    var tablename = 'classroomcourserecord';

    db_functions.insertGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })
});

router.post('/insertClassroom', (request, response) => {

    console.log("Request.body :", request.body);

    var tablename = 'classroom';

    db_functions.insertGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});


router.post('/insertClassroom', (request, response) => {

    console.log("Request.body :", request.body);

    var tablename = 'classroom';

    db_functions.insertGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })
});


router.post('/insertInstructor', (request, response) => {

    console.log("Request.body :", request.body);

    db_functions.insertInstructor(request.body).then(() => {
            console.log('get to afterinsertinstructor')
            db_functions.insertInstructorAvailability(request.body).then((result) => {
                console.log("verify_status", result);
                response.render('ba_admin.hbs', {
                    databaseConfirmation: true
                });
            })


        })
        .catch((error) => {
            console.log(error);
            response.render('ba_admin.hbs', {
                databaseError: true
            });
        })

});

router.post('/editInstructor', (request, response) => {


    db_functions.get_this_instructor(request.body).then((result) => {
        var instructorID = request.body.Instructors
        db_functions.get_instructors_ab_day(request.body).then((result3) => {

            db_functions.get_instructors().then((result2) => {
                response.render('./inputs/instructor.hbs', {
                    loggedIn: request.session.loggedIn,
                    user: 'temp',
                    instructor_list: result2,
                    instructor_last_name: result[0].instructorLastName,
                    instructor_first_name: result[0].instructorFirstName,
                    instructor_email: result[0].instructorEmail,
                    Monday: result3[0].Monday,
                    Tuesday: result3[0].Tuesday,
                    Wednesday: result3[0].Wednesday,
                    Thursday: result3[0].Thursday,
                    Friday: result3[0].Friday,
                    Saturday: result3[0].Saturday,
                    Sunday: result3[0].Sunday,
                    comment: result[0].comments,
                    instructorID: instructorID,
                    update_instructor: true
                });
            });
        })
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/updateInstructor', (request, response) => {

    console.log("Request.body :", request.body);
    db_functions.updateInstructor(request.body).then((result) => {
        db_functions.updateInstructorAB(request.body).then(() => {
            response.render('ba_admin.hbs', {
                databaseConfirmation: true
            });
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/insertInstructorVacations', (request, response) => {

    console.log("Request.body :", request.body);

    var tablename = 'InstructorVacations';

    db_functions.insertInstructorDays(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch(error => {
        console.log('add instructor vacations error ', error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/editInstructorVacations', (request, response) => {

    console.log("instructor.vacation.body :", request.body.Instructors);

    var query = 'SELECT * FROM InstructorVacations WHERE instructors =';
    var param =  request.body.Instructors

    db_functions.get_data_from_database(query, param).then((result) => {
        console.log("verify_status_from_edit_vacations", result[0].instructorvacationsStart);
        db_functions.get_instructors().then((result2) => {
            response.render('./inputs/instructor_vacations.hbs', {
                loggedIn: request.session.loggedIn,
                user: 'temp',
                instructor_list: result2,
                vacations:result,
                instructorID:request.body.Instructors,
                edit:true
            });
        })   
    }).catch(error => {
        console.log('add instructor vacations error ', error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/updateInstructorVacations', (request, response) => {

    console.log("Request.body update vacations:", request.body.instructorID);

    var tablename = 'InstructorVacations';
    var query = 'DELETE FROM instructorVacations WHERE instructors ='
    var param = request.body.instructorID
db_functions.get_data_from_database(query,param).then((dresult)=>{
    console.log("verify_d_status", dresult);
    request.body.Instructors = request.body.instructorID;
    delete request.body.instructorID;
    console.log('fixed body: ',request.body)
    db_functions.insertInstructorDays(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    })
}).catch(error => {
    console.log('add instructor leaves error ', error)
    response.render('ba_admin.hbs', {
        databaseError: true
    });
})  
});

router.post('/insertInstructorLeaves', (request, response) => {

    console.log("Request.body :", request.body);

    var tablename = 'Instructorleaves';

    db_functions.insertInstructorDays(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch(error => {
        console.log('add instructor leaves error ', error)
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/editInstructorLeaves', (request, response) => {

    console.log("instructor.leaves.body :", request.body.Instructors);

    var query = 'SELECT * FROM InstructorLeaves WHERE instructors =';
    var param =  request.body.Instructors

    db_functions.get_data_from_database(query, param).then((result) => {
        console.log("verify_status_from_edit_leaves", result);
        db_functions.get_instructors().then((result2) => {
            response.render('./inputs/instructor_leaves.hbs', {
                loggedIn: request.session.loggedIn,
                user: 'temp',
                instructor_list: result2,
                leaves:result,
                instructorID:request.body.Instructors,
                edit:true
            });
        })   
    }).catch(error => {
        console.log('add instructor vacations error ', error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/updateInstructorLeaves', (request, response) => {

    console.log("Request.body update vacations:", request.body.instructorID);

    var tablename = 'instructorLeaves';
    var query = 'DELETE FROM instructorLeaves WHERE instructors ='
    var param = request.body.instructorID
db_functions.get_data_from_database(query,param).then((dresult)=>{
    console.log("verify_d_status", dresult);
    request.body.Instructors = request.body.instructorID;
    delete request.body.instructorID;
    console.log('fixed body: ',request.body)
    db_functions.insertInstructorDays(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    })
}).catch(error => {
    console.log('add instructor leaves error ', error)
    response.render('ba_admin.hbs', {
        databaseError: true
    });
})  
});

router.post('/insertInstructorOfficeDays', (request, response) => {

    console.log("Request.body :", request.body);

    var tablename = 'Instructorofficedays';

    db_functions.insertInstructorDays(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch(error => {
        console.log('add instructor officeDay error ', error)
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/editInstructorOfficeDays', (request, response) => {

    console.log("instructor.office.body :", request.body.Instructors);

    var query = 'SELECT * FROM instructorofficedays WHERE instructors =';
    var param =  request.body.Instructors

    db_functions.get_data_from_database(query, param).then((result) => {
        console.log("verify_status_from_edit_office", result);
        db_functions.get_instructors().then((result2) => {
            response.render('./inputs/instructor_office_days.hbs', {
                loggedIn: request.session.loggedIn,
                user: 'temp',
                instructor_list: result2,
                officeDays:result,
                instructorID:request.body.Instructors,
                edit:true
            });
        })   
    }).catch(error => {
        console.log('add instructor vacations error ', error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/updateInstructorOfficeDays', (request, response) => {

    console.log("Request.body update vacations:", request.body.instructorID);

    var tablename = 'instructorofficedays';
    var query = 'DELETE FROM instructorofficedays WHERE instructors ='
    var param = request.body.instructorID
db_functions.get_data_from_database(query,param).then((dresult)=>{
    console.log("verify_d_status", dresult);
    request.body.Instructors = request.body.instructorID;
    delete request.body.instructorID;
    console.log('fixed body: ',request.body)
    db_functions.insertInstructorDays(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    })
}).catch(error => {
    console.log('add instructor leaves error ', error)
    response.render('ba_admin.hbs', {
        databaseError: true
    });
})  
});

router.post('/showInstructorsOnDay', (request, response) => {

    console.log("Request.body :", request.body);

    db_functions.get_all_instructors_teaching_day(request.body.searchInstructorsOnDay).then((result) => {
        console.log("verify_status", result);

        response.render('./inputs/show_instructors_on_day.hbs', {
            instructorlist: result,
            loggedIn: request.session.loggedIn,
            user: 'temp'
        });
    }).catch(error => {
        console.log('show instructor on days error ', error)
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/addCourseType', (request, response) => {
    var tablename = 'coursetype';

    db_functions.insertGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/editCourseType', (request, response) => {
    var tablename = 'coursetype';

    db_functions.onDuplicateUpdate(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/deleteCourseType', (request, response) => {
    var tablename = 'coursetype';

    db_functions.deleteGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});


router.post('/addKLR', (request, response) => {
    var tablename = 'KLR';

    db_functions.insertGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/editKLR', (request, response) => {
    var tablename = 'KLR';

    db_functions.updateGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/deleteKLR', (request, response) => {
    var tablename = 'KLR';

    db_functions.deleteGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/addKLR_with_CategoryName', (request, response) => {
    var tablename = 'courseTypesAvailableKLRs';

    db_functions.insertGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/deleteKLR_with_CategoryName', (request, response) => {
    var tablename = 'courseTypesAvailableKLRs';
    console.log(request.body);
    let dual_pk = JSON.parse(request.body.combo);
    db_functions.deleteDualPK(dual_pk, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});



router.post('/addKLR_with_instructors', (request, response) => {
    var tablename = 'instructorcourses';

    db_functions.insertGeneralData(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/deleteKLR_with_instructors', (request, response) => {
    var tablename = 'instructorcourses';
    console.log(request.body);
    let dual_pk = JSON.parse(request.body.combo);
    db_functions.deleteDualPK(dual_pk, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/assignInstructor', (request, response) => {
    db_functions.assign_instructor_session(request.body).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/assignLearner', (request, response) => {
    db_functions.assign_learner_session(request.body).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });
    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })

});

router.post('/edit_learner', (request, response) => {
    db_functions.getEditLearner(request.body).then((result) => {
    response.render('./inputs/edit_learner.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp',
        learner_list: result
        });
    });
});

router.post("/editLearnerInfo", (request, response) => {
    db_functions.updateGeneralData(request.body, 'learner').then((result) => {
        response.render('ba_admin.hbs', {
            databaseConfirmation: true
        });

    }).catch((error) => {
        console.log(error);
        response.render('ba_admin.hbs', {
            databaseError: true
        });
    })
});

module.exports = router;