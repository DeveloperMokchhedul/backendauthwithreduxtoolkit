const User = require("../models/registration"); // Correct import name to `User`
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registration = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists, use a different email" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name,
        email,
        password: hashPassword
    });
    return res.status(201).json({
        message: "User created successfully",
        newUser
    });
};



const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(400).json({ message: "Account does not exist. Please create an account first." });
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
        { id: existingUser._id, email: existingUser.email, name: existingUser.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000 // 1 hour
    });
    return res.status(200).json({
        message: "User logged in successfully",
        status: true,
        user: { name: existingUser.name, email: existingUser.email, role: existingUser.role } // Return non-sensitive user data
    });
};


const userLogout = async(req, res)=>{
    res.clearCookie("token")
    return res.status(200).json({
        message:"Logout succesfully"
    })
}




module.exports = { registration, userLogin,userLogout };
