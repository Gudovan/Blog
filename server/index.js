import express from 'express';
import mongoose from  'mongoose';
import router from './routes/user-routes.js';
import route from './routes/blog-routes.js';
import cors from "cors"

const app =express();
app.use(cors())
app.use(express.json())
app.use("/api/user",router)
app.use("/api/blog",route)
const URL="mongodb+srv://admin:aishu@cluster0.jntnybb.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URL)
    .then(()=>
    app.listen(5000))
    .then(()=>
    console.log("listening to the port 5000 and connected to the mongoDB successfully"))
    .catch((err)=>console.log(err));

// const PORT = 5000;

// app.listen(PORT,()=>{
//     console.log(`listening to the port ${PORT}`)
// })