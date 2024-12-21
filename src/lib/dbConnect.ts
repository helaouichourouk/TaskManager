import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    const mongoURI = process.env.MONGO_URI; // Lire l'URI depuis les variables d'environnement

    if (!mongoURI) {
        throw new Error('MongoDB URI is not defined in environment variables.');
    }

    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(mongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as mongoose.ConnectOptions);
            console.log('MongoDB connected');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    }
};

export default connectDB;
