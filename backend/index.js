import dotenv from "dotenv";
dotenv.config();//env config
import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import { connectDB } from "./db/index.db.js";
import userRouter from "./routes/user.router.js";
import blogRouter from "./routes/blog.router.js";

const app = express()
const PORT = process.env.PORT || 8000

//middleware
const allowedOrigins = [
  'https://blog-mern-app-client.vercel.app',
  // Add any other origins that should be allowed
];

// Configure CORS with specific origin(s)
app.use(
  cors({
    origin: 'https://blog-mern-app-client.vercel.app'
  })
);
app.use(express.json())
app.use(morgan("dev"))

//mongoDB connection
connectDB()

//routes
app.get("/",(req,res) => {
  res.status(200).send({
       "message": "Node index.js"
  })
});

//user router
app.use("/api/v1/user",userRouter);
app.use("/api/v1/blogs",blogRouter)

//listen
app.listen(PORT, () => {
   console.log(`Server is running on ${process.env.DEV_MODE} mode on Port:${PORT}`.bgBlue.black);
})