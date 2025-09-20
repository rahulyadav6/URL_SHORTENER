import urlSchema from "../models/shortUrl.model.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlService = async (url) =>{
    const shortUrl = generateNanoId(7);
    const newUrl = new urlSchema({
        full_url: url,
        short_url: shortUrl
    });
    await newUrl.save();
    return shortUrl;
}