const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = requie('../models/userModel.js');
const SECRET_KEY = process.env.SECRET_KEY || '1028uue7w2398' ;
const blacklist = new Set() ;

class UserController {
    static async register(req, res) {
        const { first_name, last_name, email, password, phone_number, date_of_birth, gender } = req.body;

        try {
            // Check if user already exists
            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // send user a verification code to email 
        
            // Create a new user
            const userId = await UserModel.create({
                first_name,
                last_name,
                email,
                password: hashedPassword,
                phone_number,
                date_of_birth,
                gender
            });

            res.status(201).json({ message: 'User registered successfully', userId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async isValid(req, res){
        
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            // Find the user by email
            const user = await UserModel.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Compare the password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate a JWT token
           const token = jwt.sign(
           { user_id: user.user_id, email: user.email },
             SECRET_KEY,
           { expiresIn: '1h' }
          );

            res.status(200).json({ message: 'Login successful', token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
            
        }
    }

    static async logout(req , res){

        const token = req.headers['authorization']?.split(' ')[1];

        if(!token){
            return res.status(400).json({message: 'Token is required for logout'});
        }

        // add token to the blacklist 
        blacklist.add(token);
        res.status(200).json({ message: 'Logout Successful'});

    };
}

module.exports = UserController;
