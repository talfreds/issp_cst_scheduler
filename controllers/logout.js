const express = require('express');
const router = express.Router();
const db_functions = require('../db_functions.js');

router.get('/logout', (request, response) => {
    request.session.loggedIn = false;
    db_functions.get_instructors().then((result) => {
        response.render('home.hbs', {
            loggedIn: request.session.loggedIn,
            user: 'temp',
            instructor_list: result
        });

    }).catch((error) => {
        var instructors = [{ instructorLastName: 'No instructors found', instructorFirstName: '', instructorID: 'No ID Found' }];
        response.render('home.hbs', {
            loggedIn: request.session.loggedIn,
            user: 'temp',
            instructor_list: instructors
        });
    })
});


module.exports = router;