const express = require("express")
const router = express.Router()
const postsRouter = require("./post.route")
const userRouter = require('./user.route')


router.use("/posts", postsRouter)
router.use("/users", userRouter)

module.exports = router;