import express from "express";
import { createShortUrl, getFullUrl } from "../controllers/urlController.js";
const router = express.Router();


router.get("/", (req,res) =>{
    res.send("Hello form router");
})

router.post("/create", createShortUrl)

router.get("/:shortUrl", getFullUrl)


export default router;