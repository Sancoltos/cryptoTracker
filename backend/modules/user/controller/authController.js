const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const CTUser = require('../models/userModel');
const JWT_SECRET = process.env.JWT_SECRET;



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS}
})


async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await CTUser.findOne({email})
        if (!user || !(await user.validatePassword(password)))
            return res.status(401).json({ message: 'Invalid Creds!'});

    

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 5 * 60 * 1000); 


        user.otpCode = otp;
        user.otpExpiresAt = expires;
        await user.save();


        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "CryptoTrak OTP",
            text: `Your OTP code is ${otp}\n Do not share this code with anyone`

        })

        res.json ({ message: 'otp sent'});

    } catch (err) {
        next(err)
    }
}

async function verifyOtp (req,res,next){

   try{

     const { email , otp } = req.body

     const user = await CTUser.findOne({ email })
      if(!user || !user.otpCode || !user.otpExpiresAt){
        return res.status(400).json({message:'OTP not found. Please login again.'})
      }

       if(user.otpCode !== otp){
         return res.status(400).json({message:'Invalid OTP'})
       }

       if(user.otpExpiresAt < new Date()){
         return res.status(400).json({message:'OTP expired'})
       }

       user.otpCode = undefined
       user.otpExpiresAt = undefined
       await user.save()

       const token = jwt.sign(
        { id:user._id , role:user.role , email:user.email },
        JWT_SECRET ,
        { expiresIn:'1h' }
       )

       res.json({ token , role:user.role })

   }catch(err){
      next(err)
   }
}

module.exports = {
   login,
      verifyOtp
}
