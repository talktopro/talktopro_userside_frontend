import mongoose from "mongoose";

export const dbConnect = async()=>{
    try {
        const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING || "mongodb+srv://vishnu:Curious%4024@talk-to-pro.9beec.mongodb.net/talktopro")
        console.log("Db connected  SuccessFully")

    } catch (error) {
        console.error(error);
        
    }
}