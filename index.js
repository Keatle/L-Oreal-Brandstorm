const express = require('express');
const pool = require('./db'); // Import the database connection
const loginRouter = require('./login'); // Import login route
const app = express();
//const PORT = 5000;
//const PORT = 5001; // Change to a different port
const PORT = process.env.PORT || 5000; // Use the PORT environment variable if available, or default to 5000



// Middleware to parse JSON requests
app.use(express.json());
app.use('/login', loginRouter); // Mount login route

// Test route to fetch all users
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "user"'); // Query the 'user' table
        res.json(result.rows); // Send the query results as JSON
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Route to create a user profile
//app.post('/users', async (req, res) => {
//    try {
//        const { first_name, last_name, email, password, phone_number, date_of_birth, gender } = req.body;
//
//        // Insert user data into the database
//        const result = await pool.query(
//            `INSERT INTO "user" (first_name, last_name, email, password, phone_number, date_of_birth, gender, created_at, updated_at)
//             VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *`,
//            [first_name, last_name, email, password, phone_number, date_of_birth, gender]
//        );
//
//        res.status(201).json(result.rows[0]); // Return the newly created user
//    } catch (err) {
//        console.error(err.message);
//        res.status(500).send('Server Error');
//    }
//});

const { body, validationResult } = require('express-validator'); // Import validation utilities

// Route to create a user profile
/* app.post(
    '/users',
    [
        // Validation rules
        body('first_name').notEmpty().withMessage('First name is required'),
        body('last_name').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
        body('phone_number')
            .optional() // Phone number is optional
            .isNumeric()
            .withMessage('Phone number must contain only numbers'),
        body('date_of_birth')
            .optional()
            .isISO8601()
            .withMessage('Date of birth must be a valid date'),
        body('gender')
            .isIn(['Male', 'Female', 'Other'])
            .withMessage('Gender must be Male, Female, or Other'),
    ],
    async (req, res) => {
        // Handle validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { first_name, last_name, email, password, phone_number, date_of_birth, gender } = req.body;

            // Insert user data into the database
            const result = await pool.query(
                `INSERT INTO "user" (first_name, last_name, email, password, phone_number, date_of_birth, gender, created_at, updated_at)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *`,
                [first_name, last_name, email, password, phone_number, date_of_birth, gender]
            );

            res.status(201).json(result.rows[0]); // Return the newly created user
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
); */

const bcrypt = require('bcrypt'); // Import bcrypt
// Route to create/register a user profile
app.post(
    '/users',
    [
        // Validation rules
        body('first_name').notEmpty().withMessage('First name is required'),
        body('last_name').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { first_name, last_name, email, password, phone_number, date_of_birth, gender } = req.body;

            // Check if the email already exists
            const emailCheck = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
            if (emailCheck.rows.length > 0) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Insert the user into the database
            const result = await pool.query(
                `INSERT INTO "user" (first_name, last_name, email, password, phone_number, date_of_birth, gender, created_at, updated_at)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *`,
                [first_name, last_name, email, hashedPassword, phone_number, date_of_birth, gender]
            );

            res.status(201).json(result.rows[0]); // Return the newly created user
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);



// Route to update a user profile
//app.put('/users/:id', async (req, res) => {
//    try {
//        const { id } = req.params;
//        const { first_name, last_name, email, phone_number, date_of_birth, gender } = req.body;
//
//        // Update the user in the database
//        const result = await pool.query(
//            `UPDATE "user" 
//             SET first_name = $1, last_name = $2, email = $3, phone_number = $4, date_of_birth = $5, gender = $6, updated_at = NOW()
//             WHERE user_id = $7 RETURNING *`,
//            [first_name, last_name, email, phone_number, date_of_birth, gender, id]
//        );
//
//        if (result.rows.length === 0) {
//            return res.status(404).json({ error: 'User not found' });
//        }
//
//        res.json(result.rows[0]); // Return the updated user
//    } catch (err) {
//        console.error(err.message);
//        res.status(500).send('Server Error');
//    }
//});

//const { body, validationResult } = require('express-validator'); // Import validation utilities

// Route to update a user profile
app.put(
    '/users/:id',
    [
        // Validation rules
        body('first_name')
            .optional()
            .notEmpty()
            .withMessage('First name cannot be empty'),
        body('last_name')
            .optional()
            .notEmpty()
            .withMessage('Last name cannot be empty'),
        body('email')
            .optional()
            .isEmail()
            .withMessage('Valid email is required'),
        body('phone_number')
            .optional()
            .isNumeric()
            .withMessage('Phone number must contain only numbers'),
        body('date_of_birth')
            .optional()
            .isISO8601()
            .withMessage('Date of birth must be a valid date'),
        body('gender')
            .optional()
            .isIn(['Male', 'Female', 'Other'])
            .withMessage('Gender must be Male, Female, or Other'),
    ],
    async (req, res) => {
        // Handle validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { id } = req.params;
            const { first_name, last_name, email, phone_number, date_of_birth, gender } = req.body;

            // Build the update query dynamically
            const fields = [];
            const values = [];
            let index = 1;

            if (first_name) {
                fields.push(`first_name = $${index++}`);
                values.push(first_name);
            }
            if (last_name) {
                fields.push(`last_name = $${index++}`);
                values.push(last_name);
            }
            if (email) {
                fields.push(`email = $${index++}`);
                values.push(email);
            }
            if (phone_number) {
                fields.push(`phone_number = $${index++}`);
                values.push(phone_number);
            }
            if (date_of_birth) {
                fields.push(`date_of_birth = $${index++}`);
                values.push(date_of_birth);
            }
            if (gender) {
                fields.push(`gender = $${index++}`);
                values.push(gender);
            }

            values.push(id); // Add the user ID as the last value

            if (fields.length === 0) {
                return res.status(400).json({ error: 'No fields to update' });
            }

            // Construct the SQL query
            const query = `UPDATE "user" SET ${fields.join(', ')}, updated_at = NOW() WHERE user_id = $${index} RETURNING *`;
            const result = await pool.query(query, values);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(result.rows[0]); // Return the updated user
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// Route to delete a user profile
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the user from the database
        const result = await pool.query(`DELETE FROM "user" WHERE user_id = $1 RETURNING *`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully', user: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
