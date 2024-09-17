const express = require('express');
const app = express();
const multer  = require('multer')
const { v2:cloudinary }=require('cloudinary') ;
const { v4:uuidv4 }= require('uuid') ;
var cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser")
require("dotenv").config();
require("./database/db.js")
const infoRouter = require("./routes/infoRouter.js");
app.use(bodyParser.json())
const registration = require("./routes/registrationRoute.js")
const dashboard = require("./routes/dashboard.js");
const { auth } = require('./middleware/auth.js');



cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret:process.env.API_SECRET 
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
const random  = uuidv4()
      cb(null, random+""+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true,
    methods:["GET","POST","PUT", "DELETE"]
}))
app.use(cookieParser())
app.use("/api/info", infoRouter );
app.use("/api/user", upload.single('image') , registration );
app.use("/dashboard",auth, dashboard );



const port  = process.env.PORT
app.listen(port, ()=>{
    console.log(`server is running in ${port}`);
    
})