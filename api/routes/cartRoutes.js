const express = require("express");
const router = express.Router();
const { getCart, addItem, updateItem, clearCart } = require("../controllers/cartController");
const authM = require("../middleware/authMiddleware");

router.get('/cart', authM, getCart);
router.post('/cart/add', authM, addItem);
router.post('/cart/update', authM, updateItem);
router.post('/cart/clear', authM, clearCart);

module.exports = router;