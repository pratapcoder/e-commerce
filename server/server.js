import express from "express";
import dotenv from 'dotenv'
dotenv.config()

import { ConnectDB } from "./config/db.js";
import authRoutes from "./routes/user.routes.js";
const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes)



app.listen(PORT, () => {
    ConnectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});