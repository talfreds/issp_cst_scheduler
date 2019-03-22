const express = require('express');
const router = express.Router();
const db_functions = require('../db_functions.js');


router.get('/ba_admin', (request, response) => {
    response.render('ba_admin.hbs', {
        databaseError: false,
        databaseConfirmation: false
    });
});


router.get('/inputs/course_session', (request, response) => {
    db_functions.getAllGeneral('classroomcourserecord').then((courserecord) => {
        db_functions.getAllGeneral('coursetype').then((coursetypes) => {
            db_functions.getAllGeneral('classroom').then((sites) => {
                response.render('./inputs/course_session.hbs', {
                    loggedIn: request.session.loggedIn,
                    courserecordlist: courserecord,
                    coursetypeslist: coursetypes,
                    sitesList: sites
                });
            })
        })
    }).catch((error) => {
        console.log(error);
        var courserecorderror = [{
            courseName: 'Database Connection error. ',
            courseDate: ' '
        }];
        var coursetypeerror = [{
            Type: 'Database Connection error'
        }];
        var siteserror = [{
            site: 'Database Connection error',
            classroomName: ' '
        }];
        response.render('./inputs/KLR_with_Instructors.hbs', {
            courserecordlist: courserecorderror,
            coursetypeslist: coursetypeerror,
            sitesList: siteserror
        });
    })
});


router.get('/inputs/newKLR', (request, response) => {
    db_functions.get_KLRs().then((result) => {
        response.render('./inputs/newKLR.hbs', {
            loggedIn: request.session.loggedIn,
            klrList: result
        });
    }).catch((error) => {
        console.log(error);
        var klrList = [{
            klrName: 'Database Connection error. '
        }];
        response.render('./inputs/newKLR.hbs', {
            klrList: klrList
        });
    })
});

router.get('/inputs/newSessionName', (request, response) => {

    db_functions.getAllGeneral('coursetype').then((result) => {
        console.log(result);
        response.render('./inputs/newSessionName.hbs', {
            loggedIn: request.session.loggedIn,
            courseTypes: result
        });
    }).catch((error) => {
        console.log(error);
        var courseTypesList = [{
            courseTypes: 'Database Connection error. '
        }];
        response.render('./inputs/newSessionName.hbs', {
            courseTypes: courseTypesList
        });
    })
});


router.get('/inputs/inserts_site', (request, response) => {
    response.render('./inputs/inserts_site.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});

router.get('/inputs/KLR_with_Instructors', (request, response) => {

    db_functions.getAllGeneral('KLR').then((KLR) => {
        db_functions.getAllGeneral('instructor').then((instructor) => {
            db_functions.getAllGeneral('instructorcourses').then((instructorcourses) => {
                response.render('./inputs/KLR_with_Instructors.hbs', {
                    loggedIn: request.session.loggedIn,
                    klrList: KLR,
                    instructor_list: instructor,
                    instructorcoursesList: instructorcourses
                });
            })
        })
    }).catch((error) => {
        console.log(error);
        var klrList = [{
            klrName: 'Database Connection error. '
        }];
        var instructor_list = [{
            instructorFirstName: 'Database Connection error'
        }];
        response.render('./inputs/KLR_with_Instructors.hbs', {
            klrList: klrList,
            instructor_list: instructor_list
        });
    })
});

router.get('/inputs/KLR_with_Name_of_Sessions', (request, response) => {
    db_functions.getAllGeneral('KLR').then((KLR) => {
        db_functions.getAllGeneral('coursetype').then((coursetype) => {
            db_functions.getAllGeneral('courseTypesAvailableKLRs').then((courseTypesAvailableKLRs) => {
                response.render('./inputs/KLR_with_Name_of_Sessions.hbs', {
                    loggedIn: request.session.loggedIn,
                    klrList: KLR,
                    courseTypeList: coursetype,
                    courseTypesAvailableKLRs: courseTypesAvailableKLRs
                });
            })
        })
    }).catch((error) => {
        console.log(error);
        var klrList = [{
            klrName: 'Database Connection error. '
        }];
        var course_type_list = [{
            courseName: 'Database Connection error'
        }];
        response.render('./inputs/KLR_with_Name_of_Sessions.hbs', {
            klrList: klrList,
            courseTypeList: course_type_list
        });
    })
});

router.get('/inputs/new_learner', (request, response) => {
    db_functions.get_learners().then((result2) => {
        response.render('./inputs/new_learner.hbs', {
            loggedIn: request.session.loggedIn,
            user: 'temp',
            learner_list: result2
        });
    });
});

router.get('/inputs/learners_into_courses', (request, response) => {
    db_functions.get_instructors_in_session().then((result) => {
        db_functions.get_learners().then((result2) => {
            response.render('./inputs/learners_into_courses.hbs', {
                loggedIn: request.session.loggedIn,
                user: 'temp',
                session_list: result,
                learner_list: result2
            });
        })
    }).catch((error) => {
        var sessions = [{
            courseName: 'No sessions found'
        }];
        response.render('./inputs/learners_into_courses.hbs', {
            loggedIn: request.session.loggedIn,
            user: 'temp',
            session_list: sessions
        });
    })
});


router.get('/inputs/instructor_to_session', (request, response) => {
    const instructors = db_functions.get_instructors();
    db_functions.get_instructors_in_session().then((result) => {
        db_functions.get_instructors().then((result2) => {
            response.render('./inputs/instructor_to_session.hbs', {
                loggedIn: request.session.loggedIn,
                user: 'temp',
                session_list: result,
                instructor_list: result2
            });
        })
    }).catch((error) => {
        var sessions = [{
            courseName: 'Database Connection error'
        }];
        response.render('./inputs/instructor_to_session.hbs', {
            loggedIn: request.session.loggedIn,
            user: 'temp',
            session_list: sessions
        });
    })
});



router.get('/inputs/instructor', (request, response) => {
    db_functions.get_instructors().then((result2) => {
        response.render('./inputs/instructor.hbs', {
            loggedIn: request.session.loggedIn,
            user: 'temp',
            instructor_list: result2,
            instructor_last_name: null,
            instructor_first_name: null,
            instructor_email: null,
            Monday: null,
            Tuesday: null,
            Wednesday: null,
            Thursday: null,
            Friday: null,
            Saturday: null,
            Sunday: null,
            comment: null,
            instructorID: null,
            update_instructor: false
        });
    })
});

router.get('/inputs/siteClassroom', (request, response) => {
    db_functions.getAllGeneral('classroom').then((result) => {
        response.render('./inputs/siteClassroom.hbs', {
            loggedIn: request.session.loggedIn,
            classroom_list: result
        });
    })
});

router.post('/inputs/edit_site_classroom', (request, response) => {
    db_functions.getAllGeneral('classroom').then((result) => {
        classroom_details_object = null;
        for (let i = 0; i < result.length; i++) {
            if (result[i].classroomID == request.body.classroomID) {
                classroom_details_object = result[i];
                break;
            }
        }
        response.render('./inputs/edit_site_classroom.hbs', {
            loggedIn: request.session.loggedIn,
            classroom_details: classroom_details_object
        });
    }).catch((error) => {
        console.log(error);
        response.render('./inputs/edit_site_classroom.hbs', {
            loggedIn: request.session.loggedIn,
            classroom_details: null
        });
    })
});


router.get('/inputs/instructor_vacations', (request, response) => {

    db_functions.get_instructors().then((result2) => {
        response.render('./inputs/instructor_vacations.hbs', {
            loggedIn: request.session.loggedIn,
            user: 'temp',
            instructor_list: result2,
            vacations: null,
            edit: false
        });
    }).catch((error) => {
        console.log(error);
    })
});


router.get('/inputs/instructor_office_days', (request, response) => {

    db_functions.get_instructors().then((result2) => {
        response.render('./inputs/instructor_office_days.hbs', {
            loggedIn: request.session.loggedIn,
            user: 'temp',
            instructor_list: result2,
            officeDays: null,
            edit: false
        });
    }).catch((error) => {
        console.log(error);
    })
});

router.get('/inputs/instructor_leaves', (request, response) => {

    db_functions.get_instructors().then((result2) => {
        response.render('./inputs/instructor_leaves.hbs', {
            loggedIn: request.session.loggedIn,
            user: 'temp',
            instructor_list: result2,
            leaves: null,
            edit: false
        });
    }).catch((error) => {
        console.log(error);
    })
});

router.get('/inputs/show_instructors_on_day', (request, response) => {

    response.render('./inputs/show_instructors_on_day.hbs', {
        instructorlist: null,
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});





module.exports = router;