import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect('mongodb+srv://admin:mETLsVwLOKTsdwLQ@cluster0.g2qdj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
            console.log('MongoDB connected');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    }
};

export default connectDB;
