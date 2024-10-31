import mongoose from "mongoose";

let isConnected: boolean = false;

// This is where our connection is going to happen.
export const connectToDatabase = async () => {
  // This is going to prevent unknown field queries and also to make our DX better.
  mongoose.set("strictQuery", true);
  // Connect to our mongoDB Atlas database.
  if (!process.env.MONGODB_URL) {
    return console.log("Missing MONGODB_URL");
  }
  // Check if the connection has already established
  if (isConnected) {
    return;
  }

  // Now if we have an URL and we are not connected we need a try catch block and connect:
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "nextify",
    });
    isConnected = true;
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log("MongoDB Connection Failed ", error);
  }
};
