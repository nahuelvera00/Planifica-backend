import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    console.log("[+] Database connected!");

  } catch (error) {
    console.log("Error to connect Database |", error);
  }
}

async function disconnectDB() {

  try {
    await mongoose.disconnect()
  } catch (error) {
    console.log("Error to disconnect Database", error);
  }

}

export { connectDB, disconnectDB } 