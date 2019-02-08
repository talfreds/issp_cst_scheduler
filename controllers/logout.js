const express = require('express');
const router = express.Router();

router.get('/logout', (request, response) => {
    request.session.loggedIn = false;
    response.render('home.hbs', {
        loggedIn: request.session.loggedIn
    });
});


module.exports = router;