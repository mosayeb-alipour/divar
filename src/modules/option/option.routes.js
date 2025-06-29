const { Router } = require("express");
const optionController = require("./option.controller");

const router = Router()
router.post("/", optionController.create)
router.get("/by-category/:categoryId", optionController.findByCategoryId)
router.get("/category/:categoryId", optionController.find)
router.get("/", optionController.find)
module.exports ={
    OptionRoutes : router
}