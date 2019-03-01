const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { parse } = require("querystring");
const db_functions = require('../db_functions.js');

router.post("/addSite", (request, response) => {
    console.log(request.body);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });
});

router.post("/addKLR", (request, response) => {
    console.log(request.body);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });
});

router.post("/addKLR_with_name_of_sessions", (request, response) => {
    console.log(request.body);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });
});

router.post("/addKLR_with_instructors", (request, response) => {
    console.log(request.body);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });
});

router.post("/addNewLearner", (request, response) => {
    console.log(request.body);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });
});

router.post("/add_learner_to_course", (request, response) => {
    console.log(request.body);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });
});

router.post("/addNewLearner", (request, response) => {
    console.log(request.body);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });
});

router.post('/insertClassroom', (request, response) => {

    console.log("Request.body :", request.body);

    var tablename = 'classroom';

    db_functions.insertClassroom(request.body, tablename).then((result) => {
        console.log("verify_status", result);
        response.render('ba_admin.hbs', {});
    }).catch(error => console.log('add classroom error ', error))

});



router.post('/insertInstructor', (request, response) => {

    console.log("Request.body :", request.body);
    if (request.body.courses) {
        db_functions.insertInstructor(request.body).then(() => {

                db_functions.insertInstructorCourses(request.body).then((result) => {
                    console.log("verify_status", result);
                    response.render('ba_admin.hbs', {});
                }).catch(error => console.log('add courses error ', error))
            })
            .catch(error => console.log('add instructor error ', error))

    } else {

        db_functions.insertInstructor(request.body).then((result) => {
            console.log("verify_status", result);
            response.render('ba_admin.hbs', {});
        }).catch(error => console.log('add instructor error ', error))
    }

});

module.exports = router;