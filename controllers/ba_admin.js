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
                db_functions.getSessionList().then((THEsessionlist) => {
                    response.render('./inputs/course_session.hbs', {
                        courserecordlist: courserecord,
                        coursetypeslist: coursetypes,
                        sitesList: sites,
                        sessionsList: THEsessionlist,
                        active1: 'font-weight:bold; color:#0c5aa8;'
                    });
                })
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
            sitesList: siteserror,
        });
    })
});


router.get('/inputs/newKLR', (request, response) => {
    db_functions.getAllGeneral('klr').then((result) => {
        response.render('./inputs/newKLR.hbs', {
            klrList: result,
            active9: 'font-weight:bold; color:#0c5aa8;'
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
            courseTypes: result,
            active8: 'font-weight:bold; color:#0c5aa8;'
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

router.get('/inputs/KLR_with_Instructors', (request, response) => {

    db_functions.getAllGeneral('klr').then((KLR) => {
        db_functions.getAllGeneral('instructor').then((instructor) => {
            db_functions.getAllGeneral('instructorcourses').then((instructorcourses) => {
                response.render('./inputs/KLR_with_Instructors.hbs', {
                    klrList: KLR,
                    instructor_list: instructor,
                    instructorcoursesList: instructorcourses,
                    active5: 'font-weight:bold; color:#0c5aa8;'
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
    db_functions.getAllGeneral('klr').then((KLR) => {
        db_functions.getAllGeneral('coursetype').then((coursetype) => {
            db_functions.getAllGeneral('coursetypesavailableklrs').then((courseTypesAvailableKLRs) => {
                response.render('./inputs/KLR_with_Name_of_Sessions.hbs', {
                    klrList: KLR,
                    courseTypeList: coursetype,
                    courseTypesAvailableKLRs: courseTypesAvailableKLRs,
                    active4: 'font-weight:bold; color:#0c5aa8;'
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
    db_functions.getAllGeneral('learner').then((result2) => {
        response.render('./inputs/new_learner.hbs', {
            learner_list: result2,
            active6: 'font-weight:bold; color:#0c5aa8;'
        });
    });
});

router.get('/inputs/learners_into_courses', (request, response) => {
    db_functions.get_instructors_in_session().then((result) => {
        db_functions.getAllGeneral('learner').then((result2) => {
            db_functions.getAllGeneral('klr').then((result3) => {
                db_functions.getAllGeneral('instructorcourses').then((instructorcourses) => {
                    db_functions.getAllGeneral('coursetypesavailableklrs').then((coursetypesavailableklrs) => {
                        response.render('./inputs/learners_into_courses.hbs', {
                            active3: 'font-weight:bold; color:#0c5aa8;',
                            session_list: result,
                            learner_list: result2,
                            klr_list: result3,
                            instructor_klr: instructorcourses,
                            coursetype_klr: coursetypesavailableklrs
                        });
                    })
                })
            })
        }).catch((error) => {
            var sessions = [{
                courseName: 'No sessions found'
            }];
            response.render('./inputs/learners_into_courses.hbs', {
                session_list: sessions
            });
        })
    })
});
});


router.get('/inputs/instructor_to_session', (request, response) => {
    const instructors = db_functions.get_instructors();
    db_functions.get_instructors_in_session().then((result) => {
        db_functions.get_instructors().then((result2) => {
            response.render('./inputs/instructor_to_session.hbs', {
                user: 'temp',
                session_list: result,
                instructor_list: result2,
                active2: 'font-weight:bold; color:#0c5aa8;'

            });
        })
    }).catch((error) => {
        var sessions = [{
            courseName: 'Database Connection error'
        }];
        response.render('./inputs/instructor_to_session.hbs', {
            user: 'temp',
            session_list: sessions,
            active2: 'font-weight:bold; color:#0c5aa8;'
        });
    })
});



router.get('/inputs/instructor', (request, response) => {
    db_functions.get_instructors().then((result2) => {
        response.render('./inputs/instructor.hbs', {
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
            update_instructor: false,
            active10: 'font-weight:bold; color:#0c5aa8;'
        });
    })
});

router.get('/inputs/siteClassroom', (request, response) => {
    db_functions.getAllGeneral('classroom').then((result) => {
        response.render('./inputs/siteClassroom.hbs', {
            classroom_list: result,
            active7: 'font-weight:bold; color:#0c5aa8;'
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
            classroom_details: classroom_details_object
        });
    }).catch((error) => {
        console.log(error);
        response.render('./inputs/edit_site_classroom.hbs', {
            classroom_details: null,
            active7: 'font-weight:bold; color:#0c5aa8;'
        });
    })
});


router.get('/inputs/instructor_vacations', (request, response) => {

    db_functions.get_instructors().then((result2) => {
        response.render('./inputs/instructor_vacations.hbs', {
            instructor_list: result2,
            vacations: null,
            instructorID: null,
            edit: false,
            instructorLastName: null,
            instructorFirstName: null,
            active12: 'font-weight:bold; color:#0c5aa8;'
        });
    }).catch((error) => {
        console.log(error);
    })
});


router.get('/inputs/instructor_office_days', (request, response) => {

    db_functions.get_instructors().then((result2) => {
        response.render('./inputs/instructor_office_days.hbs', {
            user: 'temp',
            instructor_list: result2,
            officeDays: null,
            edit: false,
            instructorLastName: null,
            instructorFirstName: null,
            active14: 'font-weight:bold; color:#0c5aa8;'
        });
    }).catch((error) => {
        console.log(error);
    })
});

router.get('/inputs/instructor_leaves', (request, response) => {

    db_functions.get_instructors().then((result2) => {
        response.render('./inputs/instructor_leaves.hbs', {
            user: 'temp',
            instructor_list: result2,
            leaves: null,
            edit: false,
            instructorLastName: null,
            instructorFirstName: null,
            active13: 'font-weight:bold; color:#0c5aa8;'
        });
    }).catch((error) => {
        console.log(error);
    })
});

router.get('/inputs/show_instructors_on_day', (request, response) => {

    response.render('./inputs/show_instructors_on_day.hbs', {
        instructorlist: null,
        active15: 'font-weight:bold; color:#0c5aa8;'
    });
});





module.exports = router;