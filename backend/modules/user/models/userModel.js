const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {type:String, required: true, unique:true},
    passwordHash: {type: String, required: true},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    otpCode: String,
    otpExpiresAt: Date
})

userSchema.methods.setPassword = async function (unHashedPassword) {
    const salter3000 = await bcrypt.genSalt(15);
    this.passwordHash = await bcrypt.hash(unHashedPassword, salter3000);
}


userSchema.methods.validatePassword = async function (unHashedPassword) {
    return bcrypt.compare(unHashedPassword, this.passwordHash);
}

const CTUser= mongoose.model('CTUser', userSchema);

module.exports = CTUser;


