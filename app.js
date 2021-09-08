const express = require('express');
const app = express();
const cors = require("cors");
const session = require("express-session");
const dotenv = require('dotenv');

const sessionStore = require("./configs/session"); 
const router = require("./routes/routes");
const protect = require("./configs/protectedRoute");




app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
dotenv.config();
app.use(express.urlencoded({extended:false}));







app.use(session({
	secret:process.env.SESSION_SECRET_KEY,
	cookie:{maxAge: 3000000},//30 Second
	saveUninitialized: false,
    resave: false,
	store:sessionStore
}));





app.use(express.static("public"));

app.use("/", router);

app.get("/",protect,(req, res)=>{
	res.render('home',{title: "HOme PAGE"});
});
app.get("/login",(req, res)=>{
	res.render('login',{title: "LOGIN PAGE"});
});
app.get("/register",(req, res)=>{
	res.render('register',{title: "REGISTER PAGE"});
});
app.get("/dashboard",protect,(req, res)=>{
	res.render('dashboard',{title: "DASHBOARD PAGE"});
});












const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{console.log(`The sever running on Port ${PORT}`)})