const mongoose = require("mongoose")


function connectToDB(){
    mongoose.connect(process.env.MONGO_CONNECTION)
    .then(()=>{
        console.log("Connected To DB")
    })
}

module.exports = connectToDB