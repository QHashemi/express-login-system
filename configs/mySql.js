const mySql  = require('mysql');
var options = { 
	host     : 'localhost',
	user     : 'root',
	password : '',
	database:"express_todo_app"
}
const mySql_database = ()=>{
	var connection = mySql.createConnection(options);
	  connection.connect((err)=>{
		if(err) {
			console.log("Database connection faild!");
		} else{
			console.log("Database connected!");
		}	
	  });

	  return connection;
}



module.exports = mySql_database();