import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';

// Ensure JWT_SECRET is defined in environment variables
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Compare password with hashed password in the database
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate a JWT token
            const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

            // Send the token to the client
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default login;
