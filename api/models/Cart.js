const mongoose = require("mongoose");

const CartItemSChema = new mongoose.Schema({
    menuItem: {type:mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true}, //PICKS THE ID OF THE MENUITEM
    quantity: {type:Number, default: 1 }
});

const CartSchema = new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},  //PICKS THE ID OF THE USER
    items: [CartItemSChema]
}, {timestamps:true});

module.exports = mongoose.model('Cart', CartSchema);