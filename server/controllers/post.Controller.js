const mongoose = require("mongoose");
const Post = require("../models/postModel");

const addPost = async (req, res) => {
  try {
    const file = req.file;
    const payload = req.body;
    if (file) {
      payload.image = file.filename;
    }

    if(payload.features) {
      payload.features = JSON.parse( payload.features )
    }

    const post = await Post.create(payload);
    res.status(201).send({ message: "Post Created Successfully", post });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

const viewPost = async (req, res) => {
  try {
    const postList = await Post.find();
    console.log("Here Are The List Of Post", postList);
    res.status(200).send({
      message: "The List Of Post Are Given Below",
      Post: postList,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(200).send({ message: "Something Went Wrong" });
  }
};

const editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const payload = req.body;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).send({ message: "The Given PostId Is Invalid" });
    }
    const post = await Post.findByIdAndUpdate(postId, payload, { new: true });
    res.status(201).send({
      message: "Post Is Being Updated Sucessfully",
      Post: post,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({ message: "Something Went Wrong" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).send({ message: "Post Not Found" });
    }

    res.status(200).send({ message: "Post Deleted Sucessfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({
      message: "Something Went Wrong Try Again",
    });
  }
};
module.exports = { addPost, viewPost, editPost, deletePost };
