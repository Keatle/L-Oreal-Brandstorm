const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

//dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = 5000 ; //process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
