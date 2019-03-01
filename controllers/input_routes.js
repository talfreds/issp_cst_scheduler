const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { parse } = require("querystring");

router.post("/addSite", (request, response) => {
    console.log(request.body);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });
});

router.post("/addKLR", (request, response) => {
    request.session.loggedIn = false;
    var login_data_dict = request.body;
    console.log(request);
    console.log(request.body);
    console.log(login_data_dict);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });
});

router.post("/addKLR_with_name_of_sessions", (request, response) => {
    request.session.loggedIn = false;
    var login_data_dict = request.body;
    console.log(request);
    console.log(request.body);
    console.log(login_data_dict);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });
});

router.post("/addKLR_with_instructors", (request, response) => {
    request.session.loggedIn = false;
    var login_data_dict = request.body;
    console.log(request);
    console.log(request.body);
    console.log(login_data_dict);

    response.render("ba_admin.hbs", {
        loggedIn: request.session.loggedIn
    });
});

module.exports = router;
