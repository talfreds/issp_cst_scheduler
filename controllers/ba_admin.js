const express = require('express');
const router = express.Router();

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
    response.render('./inputs/newKLR.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
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
    response.render('./inputs/KLR_with_Instructors.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});

router.get('/inputs/KLR_with_Name_of_Sessions', (request, response) => {
    response.render('./inputs/KLR_with_Name_of_Sessions.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
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
    response.render('./inputs/instructor_to_session.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});

module.exports = router;