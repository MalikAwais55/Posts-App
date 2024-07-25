const express = require("express")
const router = express.Router()
const postsRouter = require("./post.route")


router.use("/posts", postsRouter)

module.exports = router;