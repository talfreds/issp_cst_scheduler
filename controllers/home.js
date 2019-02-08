const express = require('express');
const router = express.Router();

router.get('/home', (request, response) => {
    response.render('home.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});

router.get('/', (request, response) => {
    response.render('home.hbs', {
        loggedIn: request.session.loggedIn,
        user: 'temp'
    });
});


module.exports = router;