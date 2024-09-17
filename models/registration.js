const {  mongoose } = require("mongoose");


const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        
    },
    role:{
        type:String,
        default:"user"
    },
    password:{
        type:String,
      
    },
    pic:{
        public_id:String,
        url:String
    }
})

const user = mongoose.models.user||mongoose.model("user", userSchema)
module.exports = user