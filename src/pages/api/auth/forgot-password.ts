import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '../../../models/User'; // Replace with your User model

// Environment variables
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const APP_URL = process.env.APP_URL; // Your app's base URL (e.g., https://yourapp.com)

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Number(EMAIL_PORT) === 465, // Use TLS for port 465
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a secure reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Save the hashed token and expiry date to the user's record
        user.passwordResetToken = resetTokenHash;
        user.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Create a password reset URL
        const resetUrl = `${APP_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

        // Send the email
        await transporter.sendMail({
            from: `"Your App" <${EMAIL_USER}>`, // Replace with your app's email
            to: email,
            subject: 'Password Reset Request',
            html: `
                <p>You requested to reset your password.</p>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}" target="_blank">${resetUrl}</a>
                <p>If you did not request this, please ignore this email.</p>
            `,
        });

        res.status(200).json({ message: 'Reset link sent to your email address' });
    } catch (error) {
        console.error('Error handling forgot password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
