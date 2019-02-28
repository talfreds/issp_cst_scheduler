const express = require("express");
const hbs = require("hbs");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const homeRouter = require("./controllers/home");
const loginRouter = require("./controllers/login");
const logOutRouter = require("./controllers/logout");
const insertClassroomRouter = require("./controllers/addData");
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

// body parser allows for easy reading from forms
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// route to homepage
app.use("/", homeRouter);
app.use("/", loginRouter);
app.use("/", logOutRouter);
app.use("/", instructorSchedule);
app.use("/", baAdmin);
app.use("/", inputRoutes);
app.use("/", insertClassroomRouter);


// start server
var server_host = process.env.YOUR_HOST || "0.0.0.0";
const port = process.env.PORT || 8080;
app.listen(port, server_host, () => {
    console.log("Server is up on port: " + port);
});
