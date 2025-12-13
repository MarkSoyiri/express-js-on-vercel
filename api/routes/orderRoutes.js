const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getAllOrders, updateStatus } = require("../controllers/orderController");
const authM = require("../middleware/authMiddleware");
const adminM = require("../middleware/adminMiddleware");

router.post('/', authM, createOrder);
router.get('/', authM, getOrders);


//ADMIN

router.get('/all', authM, adminM, getAllOrders);
router.put('/:id', authM, adminM, updateStatus);

router.get('/',(req,res)=>{
    res.send("Welcome to my Backend")
})
    

module.exports = router;