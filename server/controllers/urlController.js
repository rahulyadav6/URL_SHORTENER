import urlSchema from "../models/shortUrl.model.js";
import { nanoid } from "nanoid";
import { generateNanoId } from "../utils/helper.js";
import { createShortUrlService } from "../services/shortUrlService.js";

export const createShortUrl = async(req,res)=>{
    try {
        const { url } = req.body;

        // this is direct method
        const shortUrl = generateNanoId(7);
        const newUrl = new urlSchema({
            full_url: url,
            short_url: shortUrl
        }) 
        await newUrl.save()

        // this is by creating services it's like helper funciton.
        // const shortUrl = await createShortUrlService(url);

        res.status(200).json({success:true, shortUrl: process.env.APP_URL + shortUrl});
    } catch (error) {
        console.error("Error redirecting:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getFullUrl = async(req,res)=>{
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
}