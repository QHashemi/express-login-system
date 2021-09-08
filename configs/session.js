const session = require("express-session");
var MySQLStore = require('express-mysql-session')(session);

const options =  {
	host:"localhost",
	user:"root",
	password:"",
	database:"express_todo_app"
}
var sessionStore = new MySQLStore(options);


module.exports = sessionStore;