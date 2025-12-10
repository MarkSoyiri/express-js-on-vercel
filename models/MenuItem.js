const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String,},
    name:{type:String, required:true},
    price:{type:Number, required:true},
    image:{type:String, },
    isAvailable:{type:Boolean, required:true, default:true}
},{timestamps:true });

module.exports = mongoose.model("MenuItem", MenuItemSchema);