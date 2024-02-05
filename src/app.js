import express from "express"; 
import cors from "cors"; 
import cookieParser from "cookie-parser";
const app = express(); 


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))      // for json data 
app.use(express.urlencoded({extended: true, limit:"16kb"}))     //for other data
app.use(express.static("public"))       // for static files and folders using with public directory folder

app.use(express.cookieParser())





export {app} 