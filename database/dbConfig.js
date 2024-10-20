import { connect } from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Replace with your MongoDB connection string
const uri = process.env.MONGO_DB_URL; // Your MongoDB URI and database name

const dbConfig = async () => {
    try {
        await connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

export default dbConfig;
