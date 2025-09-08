import express from "express";
import { nanoid } from "nanoid";
import urlSchema from "../models/shortUrl.model.js";
const router = express.Router();


router.get("/", (req,res) =>{
    res.send("Hello form router");
})

router.post("/create", async(req,res) =>{
    try {
        const { url } = req.body;
        const shortUrl = nanoid(7);
        const newUrl = new urlSchema({
            full_url: url,
            short_url: shortUrl
        }) 
        await newUrl.save()
        res.status(200).json({success:true, shortUrl:shortUrl});
    } catch (error) {
        console.error("Error redirecting:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
})

router.get("/:shortUrl", async(req,res) =>{
    try {
        const {shortUrl} = req.params;
        const url = await urlSchema.findOne({short_url: shortUrl});
        if(url){
            res.redirect(url.full_url);
        }else{
            res.status(404).send({success:false, message: "Not Found"})
        }
    }catch(error) {
        console.error("Error redirecting:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
})


export default router;