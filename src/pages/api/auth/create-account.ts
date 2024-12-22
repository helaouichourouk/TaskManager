import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import connectDB from '../../../lib/dbConnect'; // Assurez-vous que la connexion à la DB est établie
import User from '../../../models/User';

const createAccount = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Vérification si l'email existe déjà
    try {
        await connectDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 12);

        // Création de l'utilisateur
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default createAccount;
