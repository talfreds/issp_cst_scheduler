const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// READ THIS:

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms

const load_database = 0;

router.post('/loginAttempt', (request, response) => {
    var login_data_dict = request.body;
    var user_data = 0;

    existing_users = load_database.getDatabase();

    for (i = 0; i < existing_users.length; i++) {
        if (existing_users[i]['login'] == login_data_dict['login']) {
            user_data = existing_users[i];
        };
    };

    // user isnt in database
    if (!user_data || existing_users == []) {
        response.render('registrationForm.hbs', {
            formData_error: false,
            nameIsNotValid: false,
            duplicateName: false,
            passIsNotValid: false,
            passMatches: false,
            emailIsNotValid: false
        });
    } else {
        bcrypt.compare(login_data_dict['password'], user_data['password']).then(function(comparison_valid) {
            if (comparison_valid) {
                request.session.loggedIn = true;
                request.session.userName = user_data['login'];
                request.session.usersDatabase = existing_users;
                response.render('home.hbs', {
                    loggedIn: request.session.loggedIn,
                    user: request.session.usersDatabase
                });
            } else {
                var users = { users: existing_users };
                response.render('home.hbs', {
                    loggedIn: request.session.loggedIn
                });
            };
        });
    };
});


module.exports = router;