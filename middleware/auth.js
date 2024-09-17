const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const user = require('../models/registration');



async function auth(req, res, next) {
    const token =await req.cookies.token;
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
       req.user = verifyToken
   
  
       next()
       
        
        
        





    
    

}

module.exports = { auth };
