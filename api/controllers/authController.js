const User = require("../models/User");
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/jwt');


//REGISTER USER
const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const emailExist = await User.findOne({ email });
        const usernameExist = await User.findOne({ username });
    
        if (emailExist) return res.status(401).json({message:"Email is already registered to a User!"});
        if (usernameExist) return res.status(401).json({message:"Username Taken, choose another name!"});
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt );
    
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            
        })
    
        await newUser.save();
        if (newUser) return res.status(201).json({message:"User created Successfully!", user:newUser},);
    } catch (error) {
        res.json({error:error.message});
    }
}

//LOGIN

const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({message:"invalid credentials!"});
    
        const passwordMatch = await bcrypt.compare(password,user.password);
        if (!passwordMatch) return res.status(401).json({message:"invalid credentials"});
    
        const token = signToken({ id: user._id });
        res.status(200).json({user: {id: user._id}, token});
    } catch (err) {
        res.status(401).json({error:err.message});
        next(err)
        
    }
}


//GET PROFILE
const getProfile = async (req, res, next) => {
    try {
        res.json(req.user)
    } catch (error) {
        res.status(401).json({error:err.message});
    }
}

module.exports = { register, login, getProfile };