import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log("Error", error);
    throw new Error("Failed to connect database");
  }
}

async function disconnectToDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log("Error", error);
    throw new Error("Failed to disconnect database");
  }
}

export { connectToDatabase, disconnectToDatabase }