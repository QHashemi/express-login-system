const si = require('systeminformation');
const { seq } = require("async");
const mySql = require("../configs/mySql.js");


const user_login = (req, res)=>{
	const { email, password } = req.body;	
	var askQuery = `SELECT email, password FROM users WHERE email = '${email}'`;
	mySql.query(askQuery,(error, result)=>{
		if(error) throw error;
		console.log(result[0])
			if(result != 0){
				if(password == result[0].password){
					req.session.isAuth = true;
					res.send({msg:"You are successfully logged in !",messageStatus:"Success !", status:true, page:"/"});
				}else{
					res.send({msg:"Your password is rong!!",messageStatus:"Failed", status:false});
					
					var askQuery = `INSERT INTO log (log_message) VALUES ('Try to Login: Email: ${email}, Password: ${password}'); `;
					mySql.query(askQuery);
				}
				
			}else{
				res.send({msg:"You dont have an account !",messageStatus:"Failed", status:false});
			}	
	});	
}

const user_register = (req, res)=>{
	const {name, username, email, password } = req.body;	
	var askQuery = `SELECT email FROM users WHERE email = '${email}'`;
	mySql.query(askQuery,(error, result)=>{
		if(error) throw error;
		console.log(result);
		 	if(result <= 0){
				var query = `INSERT INTO users (full_name, username, email, password ) VALUES ('${name}','${username}','${email}','${password}');`;
				mySql.query(query, (error, result)=>{
					if(error) throw error;
					res.send({msg:"Thanks for your Regestration !",messageStatus:"success", status:true});
				});
			 }else{
				res.send({msg:"Your allreay signup",messageStatus:"failed", status:false});
			 }
	});	
}

const user_logout = (req, res, next)=>{
	console.log(req.body.isLogout)
	if(req.body.isLogout){
		req.session.destroy((error)=>{
			if(error) throw error;
		});
		res.send({msg:"Have greate day",messageStatus:"Good Bye", status:true, page:"/login"});
	}
}


module.exports = {
	user_login,
	user_register,
	user_logout
}