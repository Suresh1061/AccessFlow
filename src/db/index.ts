import mongoose from "mongoose";

type connectionObject = {
     isConnected?: number;
}

const connection: connectionObject = {}

export const connectDB = async (): Promise<void> => {
     if (connection.isConnected) {
          console.log("Database is already connected!");
          return;
     }

     try {
          const db = await mongoose.connect(process.env.MONGO_URI!);
          connection.isConnected = db.connections[0].readyState
          console.log("Database is connected successfully!");
     } catch (error) {
          console.log("Error connecting to database: ", error);
          process.exit()
     }
};