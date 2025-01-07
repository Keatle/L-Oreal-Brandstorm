const bcrypt = require('bcrypt');
const User = require('../models/userModel');

//Register a new user

exports.registerUser = async (req , res) => {
    try {
        const {username , email , password } = req.body;

        //check if user already exists 
        const existingUser = await User.findIne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        //Hash the password 
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt); 
    }
};