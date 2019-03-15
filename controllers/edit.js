const express = require('express');
const router = express.Router();
const db_functions = require('../db_functions.js');

router.get('/inputs/edit_learner', (request, response) => {
    db_functions.get_learners().then((result2) => {
    response.render('./inputs/edit_learner.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp',
        learner_list: result2
        });
    });
});



module.exports = router;