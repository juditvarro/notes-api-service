import mongoose from 'mongoose';
import { DatabaseError } from '../errors/index.js';

export const connectDb = async (url: string) => {
  try {
    await mongoose.connect(url);
    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log('Database connection established successfully');
    });
  } catch (error: unknown) {
    console.log(error);
    throw new DatabaseError('Could not connect to database.', 500);
  }
};
