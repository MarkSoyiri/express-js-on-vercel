const Order = require("../models/Order");
const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");


const createOrder = async (req, res, next) => {
    try {
        const { address, paymentMethod } = req.body;
    
        const cart = await Cart.findOne({ user:req.user._id }).populate("items.menuItem");
        if(!cart || cart.items.length === 0) return res.status(400).json({message: "Cart empty"});
    
        const items = cart.items.map( i => ({MenuItem: i.menuItem._id, quantity: i.quantity, priceAtPurchase: i.menuItem.price }));
        const total = items.reduce((s,it) => s + it.quantity * it.priceAtPurchase, 0);
    
        const order = await Order.create({ user: req.user._id, items, total, address, paymentStatus: "pending" });
        //PAYMENT FLOW SPACE HERE
    
        await Cart.findOneAndUpdate({ user: req.user._id }, {items: [] });
        res.status(201).json(order);
    } catch (err) {
        next(err);
    }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.menuItem').sort('-createdAt');
    res.json(orders);
  } catch (err) { next(err); }
};


const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user').sort('-createdAt');
    res.json(orders);
  } catch (err) { 
    next(err); 
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) { next(err); }
};


module.exports = { createOrder, getOrders, getAllOrders, updateStatus };