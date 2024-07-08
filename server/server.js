const express  = require ('express');
const connectDB = require("./config/dbConnection");
const Post = require("./models/postModel");
const {port} = require ("./config/vars");
const router = require("./routes/post.route");
const app = express()


connectDB();

app.listen(port,()=>{
    console.log(`App is listening to the Port ${port}`)
})

app.use("/api", router)