const express = require("express");
const hbs = require("hbs");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const homeRouter = require("./controllers/home");
const loginRouter = require("./controllers/login");
const logOutRouter = require("./controllers/logout");
const instructorSchedule = require("./controllers/instructor_schedule");
const baAdmin = require("./controllers/ba_admin");
const inputRoutes = require("./controllers/input_routes");

// fyi, any new routes require 3 things:
// 1. the const require above,
// 2. the app.use('/', constName); at the bottom above the server start
// 3. route matching link in html, located in views or partials directory

// it would be nice to use bcrypt vanilla but we'd all need c++ and c# compilers.. saving these instructions for later if needed
// npm install -g node-gyp
// npm install --global --production windows-build-tools
// npm install -g bcrypt

var app = express();

app.use(
    cookieSession({
        name: "loginSession",
        keys: ["thiswillbesecretlater"],
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
);

// directories
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");


//register.helper
hbs.registerHelper('formatDate', (text) => {
    var d = new Date(text),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
});

//register.helper
hbs.registerHelper('formatDatetime', (text) => {
    var d = new Date(text),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes();
    hourString = hour.toString();
    minutesString = minutes.toString();


    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hourString.length < 2) hourString = '0' + hourString;
    if (minutesString.length < 2) minutesString = '0' + minutesString;

    return [year, month, day].join('-') + "T" + [hourString, minutesString].join(':');
});

// body parser allows for easy reading from forms
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

hbs.registerHelper('getProperty', function(context, key) {
    return context[key];
});

hbs.registerHelper('getInstructorNameFromID', function(context, key) {
    for (i = 0; i < context.length; i++) {
        if (context[i].instructorID == key) {
            router.post('/assignLearner', (request, response) => {
                db_functions.insertGeneralData(request.body, 'classroomcourserecord').then((result) => {
                    console.log("verify_status", result);
                    response.render('ba_admin.hbs', {
                        databaseConfirmation: true
                    });
                }).catch((error) => {
                    console.log(error);
                    response.render('ba_admin.hbs', {
                        databaseError: true
                    });
                })

            });
            return context[i].instructorLastName + ', ' + context[i].instructorFirstName;
        }
    }
});

hbs.registerHelper('getKLRNameFromID', function(context, key) {
    for (i = 0; i < context.length; i++) {
        if (context[i].klrID == key) {
            return context[i].klrName;
        }
    }
});

hbs.registerHelper('getSessionTypeFromID', function(context, key) {
    for (i = 0; i < context.length; i++) {
        if (context[i].courseTypeID == key) {
            return context[i].Type;
        }
    }
});

hbs.registerHelper('DefaultValueDropdown', function(sessionID, tableID) {
    console.log("Session ID: " + sessionID + ", Table ID: " + tableID);
    if (sessionID == tableID) {
        return "selected";
    } else {
        return " ";
    }
});


// route to homepage
app.use("/", homeRouter);
app.use("/", loginRouter);
app.use("/", logOutRouter);
app.use("/", instructorSchedule);
app.use("/", baAdmin);
app.use("/", inputRoutes);


// start server
var server_host = process.env.YOUR_HOST || "0.0.0.0";
const port = process.env.PORT || 8080;
app.listen(port, server_host, () => {
    console.log("Server is up on port: " + port);
});