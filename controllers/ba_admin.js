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


router.get('/inputs/examplelink', (request, response) => {
    response.render('./inputs/examplelink.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});



module.exports = router;