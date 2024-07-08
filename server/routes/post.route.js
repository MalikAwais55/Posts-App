const express = require("express")
const upload = require("../config/multer")
const router = express.Router()


const {addPost,viewPost} = require("../controllers/post.Controller")
router.post("/newPost",upload.single("image"),addPost)
router.get("/viewPost" , viewPost)

module.exports=  router;