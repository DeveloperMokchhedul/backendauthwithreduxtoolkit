const  mongoose  = require("mongoose");

mongoose.connect(process.env.MOGODB_URI).then(()=>console.log("db connected successfully")
).catch((error)=>console.log(error))