const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {
    parse
} = require('querystring');

router.post('/instructor_schedule', (request, response) => {
    console.log(request.body);


    response.render('instructor_schedule.hbs', {
        loggedIn: request.session.loggedIn
    });


});


router.get('/instructor_schedule', (request, response) => {
    var login_data_dict = request.body;
    // console.log(request);
    console.log(request.body);
    console.log(login_data_dict);


    response.render('instructor_schedule.hbs', {
        loggedIn: request.session.loggedIn
    });


});

function callMethod(method) {
    return async(req, res) => {
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


router.get(`/classroomcourserecord`, callMethod((req) => {
    console.log('req.params', req.params)
    return [{
            start_date: '2019-01-31 02:55',
            end_date: '2019-01-31 05:30',
            text: 'cant believe this still works...'
        },
        {
            start_date: '2019-01-25 02:55',
            end_date: '2019-01-25 05:30',
            text: '25th'
        },
        {
            start_date: '2019-01-23 02:55',
            end_date: '2019-01-23 05:30',
            text: '23rd'
        }
    ];
}));


module.exports = router;