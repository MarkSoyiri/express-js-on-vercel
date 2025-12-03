const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors =require("cors");
const userRoute = require("./routes/userRoutes")

dotenv.config()


const app = express();

//MIDDLEWARE

//CORS ALLOWS THE COMMUNICATION OF FRONTEND AND BACKEND
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    methods:['GET', 'POST', 'DELETE', 'PUT'],
    credentials:true
}));


app.use(express.json())


app.use("/users",userRoute)

//CONNECTING TO DATABASE
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to mongoDB");
}).catch((err)=>{
    console.error("failed to connect to mongoDB :", err);
})

//STRAT SERVER
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
})