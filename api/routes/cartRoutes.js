const express = require("express");
const router = express.Router();
const { getCart, addItem, updateItem, clearCart } = require("../controllers/cartController");
const authM = require("../middleware/authMiddleware");

router.get('/', authM, getCart);
router.post('/add', authM, addItem);
router.post('/update', authM, updateItem);
router.post('/clear', authM, clearCart);

module.exports = router;