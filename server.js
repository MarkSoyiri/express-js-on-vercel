const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./routes/authRoutes");
const MenuRoute = require("./routes/menuRoutes");
const CartRoute = require("./routes/cartRoutes");
const OrderRoute = require("./routes/orderRoutes");
const errorHandler = require("./middleware/errorHandler");


dotenv.config();
const PORT = process.env.PORT || 5000; 

//CONNECTING TO DATABASE
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB")
})


const app = express()

app.use(cors({origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use('/user', AuthRoute);
app.use('/products', MenuRoute);
app.use('/', CartRoute);
app.use('/', OrderRoute);


// Error handler
app.use(errorHandler);


app.listen(PORT, ()=>{
    console.log(`Server is running on Port: ${PORT}`)
});