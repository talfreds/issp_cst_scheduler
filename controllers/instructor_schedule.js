const express = require('express');
const router = express.Router();

router.get('/instructor_schedule', (request, response) => {
    request.session.loggedIn = false;
    response.render('instructor_schedule.hbs', {
        loggedIn: request.session.loggedIn
    });
});


module.exports = router;