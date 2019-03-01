const express = require('express');
const router = express.Router();

const db_functions = require('../db_functions.js');



// READ THIS:

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms

router.post('/insertClassroom', (request, response) => {

    console.log("Request.body :", request.body);

    db_functions.insertClassroom(request.body).then((result) => {
        console.log("verify_status", result);
        response.render('home.hbs', {});
     }).catch(error=> console.log('add classroom error ',error))

});



router.post('/insertInstructor', (request, response) => {

    console.log("Request.body :", request.body);
    if (request.body.courses){
        db_functions.insertInstructor(request.body).then(()=>{
          
            db_functions.insertInstructorCourses(request.body).then((result) => {
                console.log("verify_status", result);
                response.render('home.hbs', {});
                }).catch(error=> console.log('add courses error ',error))
        })
        .catch(error=> console.log('add instructor error ',error))
   
    }else{
        
    db_functions.insertInstructor(request.body).then((result) => {
        console.log("verify_status", result);
        response.render('home.hbs', {});
     }).catch(error=> console.log('add instructor error ',error))}

});





module.exports = router;