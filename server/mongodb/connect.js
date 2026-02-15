import mongoose from 'mongoose';

const connectDB = async (url) => {
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error.message);
    throw error;
  }
};

export default connectDB;