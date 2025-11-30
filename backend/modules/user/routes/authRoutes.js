const express = require('express')
const CTrouter = express.Router;
const { register, login, verifyOtp } = require ('../controller/authController');

router.post('/login', login);
router.post('/verify-otp', verifyOtp);

module.exports = router;