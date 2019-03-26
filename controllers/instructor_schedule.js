const express = require('express');
const router = express.Router();
const {
    parse
} = require('querystring');
const db_functions = require('../db_functions.js');
require("date-format-lite");

router.post('/instructor_schedule', (request, response) => {
    let instructor_schedule_combined = []
    db_functions.get_instructor_officedays_schedules(request.body.Instructors).then((instructor_officedays) => {
        db_functions.get_instructorleaves_schedules(request.body.Instructors).then((instructorleaves) => {
            db_functions.get_instructorvacation_schedules(request.body.Instructors).then((instructorvacation) => {
                console.log('instructor_officedays          ', instructor_officedays)
                console.log('instructorleaves          ', instructorleaves)
                console.log('instructorvacation          ', instructorvacation)

                instructor_officedays.forEach((offWorkDate) => {
                    offWorkDate.start_date = offWorkDate.start_date.format("YYYY-MM-DD hh:mm");
                    offWorkDate.end_date = offWorkDate.end_date.format("YYYY-MM-DD hh:mm");
                    offWorkDate.text = 'Office Day: ' + offWorkDate.text;
                    offWorkDate.color = 'grey';
                });

                instructorleaves.forEach((offWorkDate) => {
                    offWorkDate.start_date = offWorkDate.start_date.format("YYYY-MM-DD hh:mm");
                    offWorkDate.end_date = offWorkDate.end_date.format("YYYY-MM-DD hh:mm");
                    offWorkDate.text = 'On Leave: ' + offWorkDate.text
                    offWorkDate.color = 'red';
                });

                instructorvacation.forEach((offWorkDate) => {
                    offWorkDate.start_date = offWorkDate.start_date.format("YYYY-MM-DD hh:mm");
                    offWorkDate.end_date = offWorkDate.end_date.format("YYYY-MM-DD hh:mm");
                    offWorkDate.text = 'Booked Vacation: ' + offWorkDate.text
                    offWorkDate.color = 'green';
                });

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

                        // still need to MODIFY STUDENT LIST ARRAY (add as text to the instructors classes)
                        // ie modify "class_lists" variable
                        // this should probably be done in the loop modifying date format for instructor_classes


                        // once modified, add the modified list to this array
                        let instructor_schedule_combined = instructor_officedays.concat(instructorleaves, instructorvacation)
                        console.log(instructor_schedule_combined);
                        let instructor_schedule_combined_stringified = JSON.stringify(instructor_schedule_combined);


                        response.render('instructor_schedule.hbs', {
                            loggedIn: request.session.loggedIn,
                            instructor_schedule: instructor_schedule_combined_stringified
                        });
                    })
                })
            })
        })
    }).catch((error) => {
        // need to deal with the error and display it here
        console.log('error, ', error);
    })




});

module.exports = router;