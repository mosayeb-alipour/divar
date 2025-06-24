const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const createHttpError = require("http-errors");
const { AuthMessage } = require("./auth.messages");
const {randomInt} = require("crypto");
require("dotenv").config();
const jwt = require("jsonwebtoken"); // Assuming you have a JWT library for token generation
class AuthService {
    #model;
    constructor() {
        autoBind(this);
        this.#model = UserModel; // This should be initialized with an actual model instance
        // Initialize any dependencies or configurations here
    }
    async sendOTP(mobile){
        const user = await this.#model.findOne({ mobile });
        const now = new Date().getTime();
        const otp ={
            code : randomInt (10000,99999), // Generate a random 5-digit code
            expiresIn : now + (1000*60*2),// Set

        }
        if (!user){
            const newUser = await this.#model.create({mobile,otp});
            return newUser;
        }
        // Check if the user has an OTP and if it is still valid
        if (user.otp && user.otp.expiresIn > now) {
            throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired);
    }
        user.otp = otp; // Assign the OTP to the user object
        await user.save();
        return user;
        // Logic to send OTP to the user's mobile number
        // This could involve generating a code, saving it to the database, and sending it via SMS

    }
    async checkOTP(mobile, code){
        const user = await this.checkExistByMobile(mobile);
        const now = new Date().getTime();
        // Check if the OTP exists and is valid
        if(user?.otp?.expiresIn< now){
            throw new createHttpError.BadRequest(AuthMessage.OtpCodeExpired);
        }
        if(user?.otp?.code !== code){
            throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotMatch);
        }
        if(!user.verifiedMobile){
            user.verifiedMobile = true; // Mark the mobile number as verified
    
        }
        const accessToken = this.signToken({mobile,id:user._id})
        user.accessToken = accessToken; // Assign the access token to the user object
        await user.save();
        return accessToken; // Return the access token to the user
    }
    async checkExistByMobile(mobile) {
        const user = await this.#model.findOne({ mobile });
        if (!user) throw new createHttpError.NotFound(AuthMessage.NotFound);
        return user;
   
}
signToken (payload){
    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn: "1y"});
}
}
module.exports = new AuthService();