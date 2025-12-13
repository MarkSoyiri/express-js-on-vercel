const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");


const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({user: req.user._id }).populate('items.menuItem');
        res.json(cart || { items: [] });
    } catch (err) {
        next(err)
    }
};


const addItem = async (req, res, next) => {
    try {
        const { menuItemId, quantity = 1 } = req.body;
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) return res.status(404).json({ message: "Menu item not Found" });

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) cart = await new Cart({ user: req.user._id, items: [] });

        const existing = cart.items.find(i => i.menuItem.toString() === menuItemId );

        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.items.push({ menuItem: menuItemId, quantity });
        }

        await cart.save();
        const populated = await cart.populate('items.menuItem');
        res.json(populated);
    } catch (err) {
        next(err)
    };
}


const updateItem = async (req, res, next) => {
    try {
        const { menuItemId, quantity } = req.body;
        const cart = await Cart.findOne({ user:req.user._id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        const item = cart.items.find(i => i.menuItem.toString() === menuItemId);
        if (!item) return res.status(404).json({ message: "Item not in cart"});

        item.quantity += quantity;
        cart.items = cart.items.filter(i => i.quantity > 0);
        await cart.save();
        res.json(cart)
    } catch (err) {
        next(err)
    }
}


const clearCart = async (req, res, next) => {
    try {
        await Cart.findOneAndUpdate({ user:req.user._id }, { items: [] });
        res.json({ message: 'Cart cleared' })
    } catch (err) {
        next(err)
    }
}

module.exports = { getCart, addItem, updateItem, clearCart };