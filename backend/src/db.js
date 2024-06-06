import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let db;

async function connectToDB(cb) {
  const url = process.env.MONGODB_URI;

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Adjust the timeout as needed
      connectTimeoutMS: 10000,
    });
    console.log("Connected to MongoDB via Mongoose");
    db = mongoose.connection;
    cb();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
}

export { db, connectToDB };
