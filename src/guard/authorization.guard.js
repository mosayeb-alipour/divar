const createHttpError = require("http-errors");
const AuthorizationMessage = require("../common/messages/auth.message");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../modules/user/user.model");
const Authorization = async  (req,res,next) => {
    try{
        const token  = req?.cookie?.access_token;
        if(!token) throw new createHttpError.Unauthorized(AuthorizationMessage.Login);
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        if(data?.id){
            const user = await UserModel.findById(data.id).lean();
            if(!user) throw new createHttpError.Unauthorized(AuthorizationMessage.NotFoundUser);
            req.user = user;

        }

    }catch (error) {
        next(error);
    }
}