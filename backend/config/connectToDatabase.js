import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('Database is connected successfully');
    } catch (error) {
        console.log('Error in connecting database', error.message);
    }
}

export default connectToDatabase;