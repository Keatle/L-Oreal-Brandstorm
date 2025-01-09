const db = require('../config/db'); // Database connection

class UserModel {

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(userData) {
        const { first_name, last_name, email, password, phone_number, date_of_birth, gender } = userData;
        const sql = `
            INSERT INTO user 
            (first_name, last_name, email, password, phone_number, date_of_birth, gender) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [first_name, last_name, email, password, phone_number, date_of_birth, gender];
        const [result] = await db.query(sql, values);
        return result.insertId;
    }
    
}

module.exports = UserModel;
