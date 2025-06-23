const authService = require("./auth.service");
const autoBind = require("auto-bind");
const { AuthMessage } = require("./auth.messages");

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

        } catch (error) {
            next(error);
        }
    }
    
}
module.exports = new AuthController();