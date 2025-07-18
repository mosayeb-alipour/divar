const { Schema, Types, model } = require("mongoose");

const PostSchema = new Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    category: {type: Types.ObjectId , ref: "Category" , required: true},
    province: {type: String, required: true},
    city: {type: String, required: true},
    district: {type: String, required: true},
    coordinate:{type: [Number], required: true},//51.123456,35.123456
    images:{type: [String],required: false, default:[]},
},{
    timestamps: true,
});
const PostModel = model("post", PostSchema);
module.exports = PostModel;