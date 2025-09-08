import express from "express";
import { nanoid } from "nanoid";
const router = express.Router();


router.get("/", (req,res) =>{
    res.send("Hello form router");
})

router.post("/create", (req,res) =>{
    const { url } = req.body;
    console.log(url + nanoid(7));
    res.status(200).json({success:true, url:url});
})

export default router;