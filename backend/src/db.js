import mongoose from 'mongoose';

let db; 

async function connectToDB(cb) {
  const url = "mongodb+srv://pranayerra2003:Pranay@cluster0.gmrrjw4.mongodb.net/VOTING_APP?retryWrites=true&w=majority";
  
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
