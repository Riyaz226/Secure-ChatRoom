import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURL = process.env.MONGO_URI;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('MongoDB Connection Successful');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
    }
};

const DB = async () => {
    await connectMongoDB();
};

export default DB;
