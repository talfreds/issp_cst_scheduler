// when using a non-local, non-test database, this file should be in git ignore to prevent the key being public

// or use a dotenv module to load environmental vars


const mysql = require('mysql');



// for this module to work we need native password authentication.. so run this in a mysql terminal
// in production we can create another user and run on the same network..
//  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password';
var connection = mysql.createConnection({
    host : process.env.host || 'localhost',
    user: process.env.user || 'root',
    password: process.env.password || 'Password',
    database: process.env.database || 'CSTScheduling',
    port: 3306
});

// run this directly if you want to do remote database stuff
// otherwise import it to use the database




module.exports = {
    mysql, connection
};