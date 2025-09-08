import express from "express";
import { nanoid } from "nanoid";
import urlSchema from "../models/shortUrl.model.js";
const router = express.Router();


router.get("/", (req,res) =>{
    res.send("Hello form router");
})

router.post("/create", (req,res) =>{
    const { url } = req.body;
    const shortUrl = nanoid(7);
    const newUrl = new urlSchema({
        full_url: url,
        short_url: shortUrl
    }) 
    newUrl.save()
    res.status(200).json({success:true, shortUrl:shortUrl});
})




export default router;