
import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error: ", error.message);
        process.exit(1);
    }
}