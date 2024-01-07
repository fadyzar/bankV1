import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/usersRoutes.js";


import { errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
dotenv.config();

const app = express();

app.use(cors()); // Solving cors
app.use(express.json()); // Body parser middleware

// User Routes - create user, get users , get single user
app.use("/api/v1/users", router);



app.use(errorHandler); // Error handler middleware

const PORT = process.env.PORT || 3000; // takes port from .env or just put 3000

connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
})
