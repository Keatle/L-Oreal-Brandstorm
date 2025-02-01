const db = require('../config/db'); 
const nodemailer = require('nodemailer');
const crypto = require('crypto');

class UserModel {

    static async findByEmail(email) {
        
        try {
            // rows because we want to return all the user's details 
            const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error('Error finding user by email');
        }
    }

    static async sendCode(email){

        const existing = await this.findByEmail(email); 
        
        const code = crypto.randomBytes(3).toString('hex');
        const expirationTime = new Date(Date.now() + 15 * 60 * 1000);

        if (existing){
            await db.query('UPDATE email_verification SET code = ? , expiration = ? ', 
            [code, expirationTime, email]);
        }else {
            await db.query('INSERT INTO email_verification (email, code, expiration) VALUES (?, ?, ?)', 
            [email, code, expirationTime]);
        }

        // Create a transporter object for sending emails
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: { 
                user: 'olympusloreal.noreply@gmail.com',
                pass: 'olympusloreal123',
            },
        });
 
        const mailOptions = {
            from: "olympusloreal",
            to: email,
            subject: 'Email Verfication code ', 
            text: 'Your Verification code is : ${code}',
        }

        //send the email
        try{
            await transporter.sendMail(mailOptions);
            console.log('Verification code sent to ${email}');
            return true ;
        }
        catch (error){
            console.error('Error sending email', error) ;
            return false ;
        }

    }

    static async verifyCode(code)   {
        try{
            const [rows] = await db.query('SELECT email FROM email_verification WHERE code = ? AND expiration > NOW()'
                , [code]) ;
                
            //check if matching record exists
               return rows.length > 0; 
        }
        catch(error){
                console.error('Error Verifying code', error);
                throw new Error('Database query failed');
        }
    }

    static async create(userData) {

        const { first_name, last_name, email, password, phone_number, date_of_birth, gender } = userData;
        const register = `
            INSERT INTO user 
            (first_name, last_name, email, password, phone_number, date_of_birth, gender) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;

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
