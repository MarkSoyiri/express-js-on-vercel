const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const AuthRoute = require("../routes/authRoutes");
const MenuRoute = require("../routes/menuRoutes");
const CartRoute = require("../routes/cartRoutes");
const OrderRoute = require("../routes/orderRoutes");

dotenv.config();

// === FIX 1: Globally cached DB connection ===
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const db = await mongoose.connect(process.env.MONGO_URI);
  isConnected = db.connections[0].readyState === 1;

  console.log("MongoDB Connected");
}

// === EXPRESS APP ===
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://react-shop-project-bootstrap.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// === ROUTES ===
app.use("/user", async (req, res, next) => {
  await connectDB();
  AuthRoute(req, res, next);
});

app.use("/products", async (req, res, next) => {
  await connectDB();
  MenuRoute(req, res, next);
});

app.use("/cart", async (req, res, next) => {
  await connectDB();
  CartRoute(req, res, next);
});

app.use("/order", async (req, res, next) => {
  await connectDB();
  OrderRoute(req, res, next);
});

app.get("/", (req, res) => {
  res.send("Backend running on Vercel");
});

// === IMPORTANT: EXPORT FOR VERCEL ===
module.exports = app;
