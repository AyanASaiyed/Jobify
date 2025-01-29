import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfuly Connected to MongoDB");
  } catch (error) {
    console.log("Error Connecting to MongoDB: ", error);
  }
};

export default connectToMongoDB;
