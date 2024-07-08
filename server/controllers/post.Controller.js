const Post = require("../models/postModel")


const addPost = async(req,res)=>{

    try {
        const file = req.file
        const payload = req.body

        if(file) {
            payload.image= file.originalname 
        }

        const post = await Post.create(payload)
        res.status(201).send({message: "Post Created Successfully", post})


        
    } catch (error) {
        res.status(500).send({message: "Something went wrong"})
    }

}

const viewPost = async (req,res)=>{
    try {
        const postList = await Post.find()
        console.log("Here Are The List Of Post", postList)
        res.status(200).send({
            message: "The List Of Post Are Given Below",
            Post : postList
        })
    } catch (error) {
        console.log(error, "error")
        res.status(200).send({message: "Something Went Wrong"})
    }
}

module.exports = {addPost,viewPost}

