const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',       // Replace with your PostgreSQL username
    host: 'localhost',           // Database host
    database: 'NOK',      // Database name
    password: 'devdynasty123',   // Replace with your PostgreSQL password
    port: 5432,                  // Default PostgreSQL port
});

module.exports = pool;
