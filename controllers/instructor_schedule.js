const express = require('express');
const router = express.Router();
const {
    parse
} = require('querystring');
const db_functions = require('../db_functions.js');
require("date-format-lite");

router.post('/instructor_schedule', (request, response) => {
    db_functions.get_instructor_schedules(2).then((result) => {
        result.forEach((courseDate) => {
            courseDate.start_date = courseDate.start_date.format("YYYY-MM-DD hh:mm");
            courseDate.end_date = courseDate.end_date.format("YYYY-MM-DD hh:mm");
            courseDate.text = 'placeholder';
        });
        var parsed_result = JSON.stringify(result);
        response.render('instructor_schedule.hbs', {
            loggedIn: request.session.loggedIn,
            instructor_schedule: parsed_result
        });

    }).catch((error) => {
        // need to deal with the error and display it here
        console.log('error, ', error);
    })




});

module.exports = router;