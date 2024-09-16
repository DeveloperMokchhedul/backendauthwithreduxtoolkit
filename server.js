const express = require('express');
const app = express();
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

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true,
    methods:["GET","POST","PUT", "DELETE"]
}))
app.use(cookieParser())
app.use("/api/info", infoRouter );
app.use("/api/user", registration );
app.use("/dashboard",auth, dashboard );



const port  = process.env.PORT
app.listen(port, ()=>{
    console.log(`server is running in ${port}`);
    
})