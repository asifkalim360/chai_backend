import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express(); 


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))      // for json data 
app.use(express.urlencoded({extended: true, limit:"16kb"}))     //for other data
app.use(express.static("public"))       // for static files and folders using with public directory folder
app.use(cookieParser())         // using cookieParser as a middleware. 

/**
 * uper me jitne bhi configuration settings hain wo pahle hi likh diye jayenge or 
 * uske baad humlog apne router ka kaam eske niche krenge takki project ke liye 
 * bhi chije chye ho wo usko phale hi mil jaye.
 * ab yahan se humlog apna main kaam krenge Router ka upe me jitne bhi kaam huye hain
 * wo humlog ke main settings hain or important setting hain jo ki production grade project me ki jaati hai 
 * humlog router app.js me hi likenge taaaki humlog ka index file pe jyada load na aaye wo ek clean rhe.
 * jisse humlog ka project clean or fast rhega.
*/

//routes import 
import userRouter from "./routes/user.routes.js"

//routed declaration
app.use("/api/v1/users", userRouter)        //using routes as a middleware and pass the route in userRouter => "./routes/user.routes.js"

//https://localhost:8000/api/v1/users/userRoutes(----------)



export {app} 