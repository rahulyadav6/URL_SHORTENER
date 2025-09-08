import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    full_url: {
        type:String,
        required: true,
    },
    short_url: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
});

const urlSchema = mongoose.model('shortUrl', shortUrlSchema);
export default urlSchema;