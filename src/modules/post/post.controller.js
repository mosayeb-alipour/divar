const autoBind = require("auto-bind");
const HttpCodes = require ("http-codes");
const postService = require("./post.service");
const { PostMessage } = require("./post.message");
const CategoryModel = require("../category/category.model");
class PostController{
    #service;
    constructor(){
        autoBind(this);
        this.#service = postService;
    }
    async createPostPage(req, res, next) {
        try {
            const categories = await CategoryModel.aggregate([
                {  
                    $match:{parent: null}
                }]);                
            res.render("./pages/panel/create-post.ejs"),{
                categories,
            }
            
            
        } catch (error) {
            next(error);
            
        }
    }
    async create(req,res,next){
        try {
            const {name,icon,slug,parent} = req.body;
            await this.#service.create({name,icon,slug,parent})
            return res.status(HttpCodes.CREATED).json({
                message: PostMessage.Created
            })
        } catch (error) {
            next(error)
            
        }
    }
    async find(req,res,next){
        try {

        } catch (error) {
            next(error)
        }
    }
    async remove(req,res,next){
        try {
            const {id} = req.params;
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new PostController();