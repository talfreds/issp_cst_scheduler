const express = require('express');
const router = express.Router();
const {
    parse
} = require('querystring');
const db_functions = require('../db_functions.js');
require("date-format-lite");

router.post('/instructor_schedule', (request, response) => {
    console.log(request.body);


    response.render('instructor_schedule.hbs', {
        loggedIn: request.session.loggedIn
    });


});


router.get('/instructor_schedule', (request, response) => {
    response.render('instructor_schedule.hbs', {
        loggedIn: request.session.loggedIn
    });


});

function callMethod(method) {
    return async (req, res) => {
        let result;

        try {
            result = await method(req, res);
        } catch (e) {
            result = {
                action: "error",
                message: e.message
            }
        }

        res.send(result);
    }
};

var get_calendar_data = () => {

    db_functions.get_instructor_schedules(2).then((result) => {
        console.log('result, ', result);

        result.forEach((courseDate) => {
            courseDate.start_date = courseDate.start_date.format("YYYY-MM-DD hh:mm");
            courseDate.end_date = courseDate.end_date.format("YYYY-MM-DD hh:mm");
        });
        console.log(result);
        parsed_result = JSON.parse(JSON.stringify(result));
        console.log(parsed_result);
        return parsed_result;

    }).catch((error) => {
        // need to deal with the error and display it somehow here
        console.log('error, ', error);
    })
}


router.get(`/classroomcourserecord`, callMethod((req) => {
    console.log('req.params.. this should be the instructorID', req.params)
    var test = get_calendar_data();

    console.log('wtf');
    console.log('test         ', test);
    console.log('wtf');

    //     return [ { start_date: '2019-03-03 08:00',
    //     end_date: '2019-03-03 19:00',
    //     text: 'Example 1 Comment' },
    //   { start_date: '2019-03-05 08:00',
    //     end_date: '2019-03-05 12:00',
    //     text: 'Example 2 Comment' },
    //   { start_date: '2019-03-06 12:00',
    //     end_date: '2019-03-06 15:00',
    //     text: 'Example 1 Comment' } ];
    console.log('wtf2');
    //    //this is just left as a reference to the correct syntax for providing calendar data
    // return [{
    //         start_date: '2019-01-31 02:55',
    //         end_date: '2019-01-31 05:30',
    //         text: 'this fills the text box in the calendar entry...'
    //     },
    //     {
    //         start_date: '2019-01-25 02:55',
    //         end_date: '2019-01-25 05:30',
    //         text: '25th'
    //     },
    //     {
    //         start_date: '2019-01-23 02:55',
    //         end_date: '2019-01-23 05:30',
    //         text: '23rd'
    //     }
    // ];
    // //end syntax example

}));


module.exports = router;