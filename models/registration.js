const {  mongoose } = require("mongoose");


const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    password:{
        type:String,
        required:true
    }
})

const user = mongoose.models.user||mongoose.model("user", userSchema)
module.exports = user