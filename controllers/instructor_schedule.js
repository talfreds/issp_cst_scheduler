const express = require('express');
const router = express.Router();
const {
    parse
} = require('querystring');
const db_functions = require('../db_functions.js');
require("date-format-lite");

router.post('/instructor_schedule', (request, response) => {
    db_functions.get_instructor_work_schedules(request.body.Instructors).then((instructor_classes) => {

        db_functions.get_instructor_class_list(request.body.Instructors).then((class_lists) => {

            console.log('instructor_classes                        ', instructor_classes);

            console.log('class_lists                        ', class_lists)

            instructor_classes.forEach((courseDate) => {
                courseDate.start_date = courseDate.start_date.format("YYYY-MM-DD hh:mm");
                courseDate.end_date = courseDate.end_date.format("YYYY-MM-DD hh:mm");
            });
            var parsed_instructor_classes_result = JSON.stringify(instructor_classes);
            console.log(request.body.Instructors);
            console.log(parsed_instructor_classes_result);

            // add queries for days off and color here
            // and another query for student list


            response.render('instructor_schedule.hbs', {
                loggedIn: request.session.loggedIn,
                instructor_schedule: parsed_instructor_classes_result
            });
        })
    }).catch((error) => {
        // need to deal with the error and display it here
        console.log('error, ', error);
    })




});

module.exports = router;