const mongoose = require("mongoose")

const connectDatabase = ()=>{
    // let connection = mongoose.connect(process.env.MongoUrl)
    let connection = mongoose.connect("mongodb+srv://talhahaider074:JgM41ledwEOGLWxB@cluster0.fmsgppb.mongodb.net/jara")
    if(connection){
        console.log('Database Connected')
    }
    else{
        console.log('Database Not Connected')
    }
}

module.exports = connectDatabase