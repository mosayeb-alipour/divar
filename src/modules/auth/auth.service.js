const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");

class AuthService {
    #model;
    constructor() {
        autoBind(this);
        this.#model = UserModel; // This should be initialized with an actual model instance
        // Initialize any dependencies or configurations here
    }
    async sendOTP(mobile){
        const user = await this.#model.findOne({ mobile });

    }
    async checkOTP(mobile, code){

    }
    
}
module.exports = new AuthService()