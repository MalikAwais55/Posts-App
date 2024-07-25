const mongoose = require("mongoose");
const Post = require("../models/postModel");
const { options } = require("../routes/post.route");

const addPost = async (req, res) => {
  try {
    const file = req.file;
    const payload = req.body;
    if (file) {
      payload.image = file.filename;
    }

    if (payload.features) {
      payload.features = JSON.parse(payload.features)
    }

    const post = await Post.create(payload);
    res.status(201).send({ message: "Post Created Successfully", post });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

const viewPost = async (req, res) => {
  try {
    const { title, status, publish, limit, page } = req.query

    console.log(req.query)

    let query = {}
    if (title) query.title = { $regex: title, $options: "i" }
    if (status) query.status = status
    if (publish) query.publish = publish

    const total = await Post.countDocuments(query)
    let pagination = {
      total,
      page,
      limit,
      totalPages: total / limit

    }

    const postList = await Post.find(query).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit)
    res.status(200).send({
      message: "The List Of Post Are Given Below",
      Post: postList,
      pagination
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
