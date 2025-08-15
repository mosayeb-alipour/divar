const autoBind = require("auto-bind");
const OptionModel = require("../option/option.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const PostModel = require("./post.model");
const CategoryModel = require("../category/category.model");
class PostService {
    #model;
    #optionModel;
    constructor(){
        autoBind(this);
        this.#model = PostModel;
        this.#optionModel = OptionModel;
    }
    async getCategoryOption(categoryId) {
        const options = await this.#optionModel.find({category: categoryId});
        return options
    }
    async create(dto) {
        return await this.#model.create(dto);
    }
    async find(query = {}) {
        return await this.#model.find(query);
    }
    
}
module.exports = new PostService();
