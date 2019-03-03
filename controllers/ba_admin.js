const express = require('express');
const router = express.Router();
const db_functions = require('../db_functions.js');


router.get('/ba_admin', (request, response) => {
    response.render('ba_admin.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});


router.get('/inputs/course_session', (request, response) => {
    response.render('./inputs/course_session.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});


router.get('/inputs/newKLR', (request, response) => {
    response.render('./inputs/newKLR.hbs', {});
});

router.get('/inputs/newSessionName', (request, response) => {
    response.render('./inputs/newSessionName.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});

router.get('/inputs/inserts_site', (request, response) => {
    response.render('./inputs/inserts_site.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});

router.get('/inputs/KLR_with_Instructors', (request, response) => {

    db_functions.get_KLRs().then((result) => {
        db_functions.get_instructors().then((result2) => {
            response.render('./inputs/KLR_with_Instructors.hbs', {
                loggedIn: request.session.loggedIn,
                klrList: result,
                instructor_list: result2
            });
        })
    }).catch((error) => {
        console.log(error);
        var klrList = [{
            klrName: 'No KLR entries found in the database. '
        }];
        var instructor_list = [{
            instructorFirstName: 'No Instructors found'
        }];
        response.render('./inputs/KLR_with_Instructors.hbs', {
            klrList: klrList,
            instructor_list: instructor_list
        });
    })
});

router.get('/inputs/KLR_with_Name_of_Sessions', (request, response) => {

    db_functions.get_KLRs().then((result) => {
        db_functions.get_session_categories().then((result2) => {
            console.log(result2);
            response.render('./inputs/KLR_with_Name_of_Sessions.hbs', {
                loggedIn: request.session.loggedIn,
                klrList: result,
                courseTypeList: result2
            });
        })
    }).catch((error) => {
        console.log(error);
        var klrList = [{
            klrName: 'No KLR entries found in the database. '
        }];
        var course_type_list = [{
            courseName: 'No Course Categories or Names found'
        }];
        response.render('./inputs/KLR_with_Name_of_Sessions.hbs', {
            klrList: klrList,
            courseTypeList: course_type_list
        });
    })
});

router.get('/inputs/new_learner', (request, response) => {
    response.render('./inputs/learners.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});

router.get('/inputs/add_learner_to_courses', (request, response) => {
    response.render('./inputs/learners_into_courses.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
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
        console.log(error);
        var sessions = [{
            courseName: 'No sessions found'
        }];
        response.render('./inputs/instructor_to_session.hbs', {
            loggedIn: request.session.loggedIn,
            user: 'temp',
            session_list: sessions
        });
    })
});



router.get('/inputs/instructor', (request, response) => {
    response.render('./inputs/instructor.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});

router.get('/inputs/siteClassroom', (request, response) => {
    response.render('./inputs/siteClassroom.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});

module.exports = router;