const mongoose = require("mongoose");



const studentInfo = mongoose.Schema({
    fname:{
        type:String,
       
    },
    roll:{
        type:Number,
       
    },
    clas:{
        type:Number,
       
    }

})
const student = mongoose.models.student||mongoose.model("student", studentInfo)
module.exports = student