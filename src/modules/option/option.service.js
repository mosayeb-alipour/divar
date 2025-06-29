const autoBind = require("auto-bind");
const OptionModel = require("./option.model");
const createHttpError = require("http-errors");
const { OptionMessage } = require("./option.message");
const { default: slugify } = require("slugify");
class OptionService {
    #model;
        constructor(){
        autoBind(this);
        this.#model = OptionModel;
    }
    async find(){
    }
    async create(optionDto) {
        const category = await this.checkExistById(optionDto.category);
        optionDto.ket = slugify(optionDto.key,{trim:  true, replacement: "_"})

    }
    async checkExistById(id) {
        const category = await this.#model.findById(id);
        if(!category) throw new createHttpError.NotFound(OptionMessage.NotFound)
            return category;

    }
}
module.exports = new OptionService();
