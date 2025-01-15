const mysql = require('mysql2/promise');
require('dotenv').config(); 

const pool = mysql.createPool({
    host: '127.0.0.1', // Use '127.0.0.1' instead of 'localhost' for compatibility
    user: 'root',     // Default MySQL username
    password:'keatlegile22',
    database:'olympusloreal', 
    port: 3306,      
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
