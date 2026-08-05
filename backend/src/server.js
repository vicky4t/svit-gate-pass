import express from "express";
import "dotenv/config";
import { prisma, connectDB, disconnectDB } from "./configs/db.js";

connectDB();
const app = express();
app.use(express.json());

const port = process.env.PORT || 8000 ;  

app.listen(port , ()=>{
    console.log(`server running on this port ${port}`);
});