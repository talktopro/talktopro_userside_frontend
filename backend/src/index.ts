import express from "express";
import { configDotenv } from "dotenv";
import { dbConnect } from "./config/dbConfig";
import { userRoutes } from "./routes/userRoutes/userRoutes";
import { errorHandler } from "./middleware/ErrorHandler/errorHandler";
const app = express();
dbConnect()
configDotenv();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api",userRoutes)
app.use(errorHandler)
app.listen(process.env.PORT || 3000, () => console.log("Server Status : Running State"));
