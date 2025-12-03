const User = require("../models/user")
const bcrypt = require("bcrypt");

export const registerUser = async (req, res) =>{

    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            res.status(401).json({message:"This email is already linked to a User!"});
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            res.status(401).json({message:"Username already exist!"})
        }
    
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        });
    
        const userSaved = await newUser.save(); 
        if (userSaved) {
            res.status(201).json({
            message:"New user created!",
            User:newUser
        })
        }
    } catch (error) {
        res.status(501).json({error:error.message});
    }
} 

//LOG IN

// export const login = async (req, res) =>{

//     const { email, password } = req.body;

//     const userAvailable = await User.findOne({ email });
//     if (!userAvailable) {
//         res.status(401).json({message:"User does not exist"});
//     }

//     const encPassword = 
// }


module.exports = registerUser