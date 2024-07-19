const mongoose = require("mongoose")

let postSchema = new mongoose.Schema({
    title: String,
    description: String, 
    image: String, 
    publish: Boolean, 
    status: {
        type: String, 
        default: 0
    }, 
    features: [String], 
}, {
    timestamps: true
}
)

module.exports = mongoose.model("Post", postSchema)