const express = require('express');
const router = express.Router();
const UserControllers = require("../controllers/userControllers.js");



router.post("/login", UserControllers.user_login);
router.post("/register", UserControllers.user_register);
router.post("/logout", UserControllers.user_logout);


module.exports = router;