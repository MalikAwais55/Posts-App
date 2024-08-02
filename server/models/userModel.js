const mongoose  = require("mongoose")


let userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
},
{
    timestamps: true
}
)

module.exports = mongoose.model("User", userSchema)