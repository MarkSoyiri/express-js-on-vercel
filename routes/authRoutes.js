const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("../controllers/authController")
const authM = require("../middleware/authMiddleware")

router.post('/register', register);
router.post('/login',login);
router.get('/profile',authM,getProfile);

module.exports = router;