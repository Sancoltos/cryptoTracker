const express = require('express')
const CTrouter = express.Router();
const { login, verifyOtp } = require ('../controller/authController');


CTrouter.post('/login', login);
CTrouter.post('/verify-otp', verifyOtp);

module.exports = CTrouter;