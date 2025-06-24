const authService = require("./auth.service");
const autoBind = require("auto-bind");
const { AuthMessage } = require("./auth.messages");
const NodeEnv = require("../../common/constant/env.enum");

class AuthController{
    #service;
    constructor(){
        autoBind(this)
        this.#service = authService; // This should be initialized with an actual service instance

    }
    async sendOTP(req,res,next){
        try {
            const {mobile} = req.body;
            await this.#service.sendOTP(mobile);
            return res.json({message: AuthMessage.sendOptSuccessfully})

        } catch (error) {
            next(error);
        }
    }
    async checkOTP(req,res,next){
        try {
            const {mobile,code} = req.body;
            const token = await this.#service.checkOTP(mobile,code);
            return res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === NodeEnv.Production
            }).status(200).json({
                message: AuthMessage.LogingSuccessfully,
                token
            })
            return res.json({message: AuthMessage.LogingSuccessfully,
                token
            })

        } catch (error) {
            next(error);
        }
    }
    
}
module.exports = new AuthController();