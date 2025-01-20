const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('./db'); // Import the database connection

const router = express.Router();

// Login route
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email exists
        const userResult = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
        console.log('Query Result:', userResult.rows); // Log the query result
        
        if (userResult.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = userResult.rows[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Respond with user data (excluding password)
        res.json({
            message: 'Login successful',
            user: {
                user_id: user.user_id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone_number: user.phone_number,
                date_of_birth: user.date_of_birth,
                gender: user.gender,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router; // Export the router
