const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {
    parse
} = require('querystring');
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
                    request.session.user = request.body.ba_email;
                    console.log('authenticated');
                    // should this be get instead of render?
                    response.render('ba_admin.hbs', {
                        // should actually render an administration panel here
                    });

                } else {
                    request.session.loggedIn = false;
                    console.log('bad password');
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





module.exports = router;