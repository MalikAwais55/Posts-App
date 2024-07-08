const mongoose = require("mongoose")

let postSchema = new mongoose.Schema({
    title: String,
    description: String,
    image : String,
    publish : Boolean,
    status: Boolean,
    features: [String],
    date : Number,
},{
    timestamps: true
}
)

module.exports= mongoose.model("Post", postSchema)