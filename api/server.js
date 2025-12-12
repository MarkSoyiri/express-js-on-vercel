const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const AuthRoute = require("../routes/authRoutes");
const MenuRoute = require("../routes/menuRoutes");
const CartRoute = require("../routes/cartRoutes");
const OrderRoute = require("../routes/orderRoutes");
const errorHandler = require("../middleware/errorHandler");

dotenv.config();

// Initialize Express
const app = express();

// Database connection (IMPORTANT for Vercel)

  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
  });

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/user", AuthRoute);
app.use("/products", MenuRoute);
app.use("/cart", CartRoute);
app.use("/order", OrderRoute);

// Root route
app.get("/", (req, res) => {
  res.send("welcome to my backend");
});

// Error middleware
app.use(errorHandler);

// ❗ IMPORTANT: EXPORT EXPRESS APP FOR VERCEL ❗
module.exports = app;
