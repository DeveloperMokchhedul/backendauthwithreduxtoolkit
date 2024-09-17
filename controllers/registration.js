const User = require("../models/registration"); // Correct import name to `User`
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require("cloudinary")

const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists, use a different email" });
        }
        const hashPassword = await bcrypt.hash(password, 10);



        const { pic } = await req.file.path
        const addData = await cloudinary.uploader.upload(req.file.path)


        const newUser = {
            name,
            email,
            password: hashPassword
        }

         newUser.pic = {
            public_id: addData.public_id,
            url: addData.secure_url
        }


        const createdUser = await User.create(newUser);
        return res.status(201).json({
            message: "User created successfully",
            createdUser
        });
    } catch (error) {
        console.log(error);
    }
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
        user: { name: existingUser.name, email: existingUser.email, role: existingUser.role, image:existingUser.pic.url } // Return non-sensitive user data
    });
    
};


const userLogout = async (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({
        message: "Logout succesfully"
    })
}




module.exports = { registration, userLogin, userLogout };
