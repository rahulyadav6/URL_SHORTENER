import express from "express";
const app = express();
import urlRoutes from "./routes/urlRoutes.js"
import { getFullUrl } from "./controllers/urlController.js";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

app.use(cors());
app.use(express.json())
app.use("/api/url", urlRoutes);
app.use("/:shortUrl", getFullUrl);

app.get("/", (req,res) =>{
    res.send("Hello World!!");
})


app.listen(3000, ()=>{
    console.log(`Listening to port ${process.env.PORT}`);
    connectDB();
})