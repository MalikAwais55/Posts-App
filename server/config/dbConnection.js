const mongoose = require('mongoose')
const {mongoURI} = require('./vars.js')

const connectDB = ()=>{
    mongoose.connect(mongoURI)
    .then(()=> console.log("DataBase is connected"))
    .catch((error)=> console.log("Error While eastablished connection to DataBase", error))
}

module.exports= connectDB