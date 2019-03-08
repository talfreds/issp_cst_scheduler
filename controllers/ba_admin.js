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

router.get('/inputs/instructor_vacations', (request, response) => {
    
    db_functions.get_instructors().then((result2) => {
        response.render('./inputs/instructor_vacations.hbs', {
            loggedIn: request.session.loggedIn,
            user: 'temp',
            instructor_list: result2
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
            instructor_list: result2
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
            instructor_list: result2
        });
    }).catch((error) => {
        console.log(error);       
    })
});

router.get('/inputs/show_instructors_on_day', (request, response) => {
    
    response.render('./inputs/show_instructors_on_day.hbs', {
        instructorlist:null,
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});

module.exports = router;