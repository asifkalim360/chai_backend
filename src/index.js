// require('dotenv').config({path: './env'});
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
})



connectDB() 












/*
import express from "express"; 
const app = express();

try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", () => {
        console.log("ERROR: ", error);
        throw error
    })
    app.listen(process.env.PORT, () => {
        console.log(`App is Listening on port no : ${process.env.PORT}`);
    })
} catch (error) {
    console.log("ERROR: ", error)
    throw error
}

*/