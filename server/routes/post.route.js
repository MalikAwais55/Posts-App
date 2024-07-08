const express = require("express")
const router = express.Router()


const {addPost} = require("../controllers/post.Controller")
router.post("/newPost", addPost)

module.exports=  router;