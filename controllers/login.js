const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { parse } = require('querystring');
const db_functions = require('../db_functions.js');





// READ THIS:

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms

router.post('/loginAttempt', (request, response) => {
    var login_data_dict = request.body;
    var user_data = 0;


    console.log("Request.body", request.body);


    db_functions.get_credentials(request.body.ba_email).then((result) => {
        console.log("verify_ba result", result);
        if (result.length != 1) {
            request.session.loggedIn = false;
            response.render('home.hbs', {
                // provide details about problem here, as error messages on the input
            });


        } else {
            var hashed_pass = result[0]["password"];

            bcrypt.compare(request.body.ba_password, hashed_pass).then(function(authenticated) {
                if (authenticated) {

                    request.session.loggedIn = true;
                    request.session.userName = input_name;
                    request.session.uid = result[0]["uid"];
                    response.render('home.hbs', {
                        // should actually render an administration panel here
                    });

                } else {
                    request.session.loggedIn = false;
                    response.render('home.hbs', {
                        // tell user they entered the wrong password
                    });
                }
            }).catch((error) => {
                console.log('bcrypt.compare Response: ', response);
                console.log('bcrypt.compare Error: ', error);
            });
            }

    }).catch((error) => {
        console.log('verify_ba Error: ', error);
    })

});




    // existing_users = load_database.getDatabase();

    // for (i = 0; i < existing_users.length; i++) {
    //     if (existing_users[i]['login'] == login_data_dict['login']) {
    //         user_data = existing_users[i];
    //     };
    // };

    // // user isnt in database
    // if (!user_data || existing_users == []) {
    //     response.render('registrationForm.hbs', {
    //         formData_error: false,
    //         nameIsNotValid: false,
    //         duplicateName: false,
    //         passIsNotValid: false,
    //         passMatches: false,
    //         emailIsNotValid: false
    //     });
    // } else {
    //     bcrypt.compare(login_data_dict['password'], user_data['password']).then(function(comparison_valid) {
    //         if (comparison_valid) {
    //             request.session.loggedIn = true;
    //             request.session.userName = user_data['login'];
    //             request.session.usersDatabase = existing_users;
    //             response.render('home.hbs', {
    //                 loggedIn: request.session.loggedIn,
    //                 user: request.session.usersDatabase
    //             });
    //         } else {
    //             var users = { users: existing_users };
    //             response.render('home.hbs', {
    //                 loggedIn: request.session.loggedIn
    //             });
    //         };
    //     });
    // };
// });


module.exports = router;