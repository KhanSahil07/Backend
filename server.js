import express from "express"

import fileUpload from "express-fileupload";

import "dotenv/config";



import pkg from "@prisma/client";

const { PrismaClient } = pkg;

import AutoController from "./controller/AutoController.js";







const prisma = new PrismaClient();











const app=express();

const PORT=process.env.PORT || 8000;

app.use(fileUpload());

//miggleware





app.use(express.json());

app.use(express.urlencoded({ extended:false}));













app.get("/",(req,res) =>

{

return res.json({message:"Hey babes its working"})

});



//import routes



import ApiRoutes from "./routes/api.js"







app.use("/api",ApiRoutes);











app.listen(PORT, ()=>

console.log(`server is runnning on http://localhost:${PORT}`)

);







