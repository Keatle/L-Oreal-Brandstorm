const mysql = require('mysql2/promise');
require('dotenv').config(); // Correct usage of dotenv

const pool = mysql.createPool({
    host: '127.0.0.1', // Use '127.0.0.1' instead of 'localhost' for compatibility
    user: 'root',     // Default MySQL username
    password:'keatlegile22', // Your MySQL password
    database:'olympusloreal', // Default database name
    port: 3306,       // Default MySQL port
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
