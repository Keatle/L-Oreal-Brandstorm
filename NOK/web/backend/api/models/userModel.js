const db = require('../config/db'); 

class UserModel {

    static async findByEmail(email) {
        try {
            const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error('Error finding user by email');
        }
    }

    static async create(userData) {
        const { first_name, last_name, email, password, phone_number, date_of_birth, gender } = userData;
        const register = `
            INSERT INTO user 
            (first_name, last_name, email, password, phone_number, date_of_birth, gender) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const details = [first_name, last_name, email, password, phone_number, date_of_birth, gender];
        try {
            const [result] = await db.query(register, details);
            return result.insertId;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Error creating user');
        }
    }
    
}

module.exports = UserModel;
