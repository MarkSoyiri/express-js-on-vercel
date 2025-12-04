const express = require("express");
const {registerUser, loginUser, userProfile} = require("../controllers/userController");
const router = express.Router();
const authJWT = require("../middleware/authenticationJWT")


router.post("/register", registerUser);
router.post('/login',loginUser)
router.get('/profile',authJWT, userProfile)

module.exports = router

