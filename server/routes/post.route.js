const express = require("express")
const upload = require("../config/multer")
const router = express.Router()

const { addPost, viewPost, editPost, deletePost } = require("../controllers/post.Controller")
router.post("/newPost", upload.single("image"), addPost)
router.get("/viewPost", viewPost)
router.put("/editPost/:id", upload.single("image"), editPost)
router.delete("/deletePost/:id", deletePost)

module.exports = router;