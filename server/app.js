import express from "express";
const app = express();
import urlRoutes from "./routes/urlRoutes.js"


app.use("/api/url", urlRoutes);

app.get("/", (req,res) =>{
    res.send("Hello World!!");
})


app.listen(3000, ()=>{
    console.log(`Listening to port 3000`);
})