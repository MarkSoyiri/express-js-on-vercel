const Users = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const multer = require('multer');


//REGISTER USER
const register = async (req, res) => {

    const { username, email, password } = req.body;

    const existingUserName = await Users.findOne({ username });
    const existingUserEmail = await Users.findOne({ email });

    if ((existingUserName || existingUserEmail)) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const RegisterUser = new Users({ username, email, password: hashedPassword });
    const RegisteredUserSaved = await RegisterUser.save();

    if (RegisteredUserSaved) {

        res.status(201).json({ message: 'User registered successfully' });
    }
};

//LOGIN

const login = async (req, res) => {

    const { email , password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email }, process.env.MY_JWT_TOKEN, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({ user,token })
};



//GET PROFILE
const getProfile = async (req, res, next) => {
    try {
        res.status(201).json(req.user)
    } catch (error) {
        res.status(401).json({error:err.message});
    }
}


// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// File filter (optional, e.g., only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = { register, login, getProfile,upload };