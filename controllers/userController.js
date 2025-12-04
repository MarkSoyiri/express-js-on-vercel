const UserModel = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) =>{

    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const emailExists = await UserModel.findOne({ email });
        if (emailExists) {
            res.status(401).json({message:"This email is already linked to a User!"});
        }

        const usernameExists = await UserModel.findOne({ username });
        if (usernameExists) {
            res.status(401).json({message:"Username already exist!"})
        }
    
        const newUser = new UserModel({
            username,
            email,
            password:hashedPassword
        });
    
        const userSaved = await newUser.save(); 
        if (userSaved) {
            res.status(201).json({
            message:"New user created!",
            user:newUser
        })
        }
    } catch (error) {
        res.status(501).json({error:error.message});
    }
} 

//LOG IN

const loginUser = async (req,res) =>{
    
   
    try {
        const { email, password } = req.body;
    
        const user = await UserModel.findOne({ email });
        const correctPassword = await bcrypt.compare(password, user.password);
    
        if(user && correctPassword ) {
            const token = jwt.sign({ id:user._id }, process.env.MY_JWT_TOKEN, { expiresIn: "1h" });
            res.status(201).json({message:"Login Successful!",user:user, access:token});
        } else {
            res.status(401).json({message:"Invalid Credentials"});
        }
    } catch (error) {
        res.status(500).json({error:"Error logging In"})
    }
}



//USER PROFILE

const userProfile = async (req,res) =>{
    try {
        const user = await UserModel.findById(req.user.id).select("-password")
    
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).json({message:"User not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Error fetching user profile"})
    }
}

module.exports = { registerUser, loginUser, userProfile }