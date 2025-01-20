const bcrypt = require('bcrypt');
const pool = require('./db'); // Make sure this points to your database connection file

(async () => {
    try {
        // Fetch all users
        const result = await pool.query('SELECT user_id, password FROM "user"');
        const users = result.rows;

        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the plain-text password

            // Update the hashed password in the database
            await pool.query(
                'UPDATE "user" SET password = $1 WHERE user_id = $2',
                [hashedPassword, user.user_id]
            );

            console.log(`Password updated for user_id: ${user.user_id}`);
        }

        console.log('All passwords have been hashed.');
    } catch (err) {
        console.error('Error hashing passwords:', err.message);
    } finally {
        process.exit(); // Exit the script
    }
})();
