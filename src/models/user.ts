import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
     name: string;
     email: string;
     password: string;
     type: "user" | "admin";
     role: string | null;
     status: "active" | "inactive";
     permissions: {
          create: boolean;
          read: boolean;
          edit: boolean;
          remove: boolean;
     };
}

const userSchema = new Schema<User>(
     {
          name: {
               type: String,
               required: true,
          },
          email: {
               type: String,
               required: true,
               unique: true,
          },
          password: {
               type: String,
               required: true,
          },
          status: {
               type: String,
               enum: ["active", "inactive"],
               default: "active", // Default status for new users
          },
          type: {
               type: String,
               enum: ["user", "admin"],
               default: "user", // Default type for new users
          },
          role: {
               type: String,
               enum: ["developer", "hr", "tester", "manager", "analyst"],
               default: null, // Role will be undefined/null by default
          },
          permissions: {
               create: {
                    type: Boolean,
                    default: false, // Default permission is false
               },
               read: {
                    type: Boolean,
                    default: false, // Default permission is false
               },
               edit: {
                    type: Boolean,
                    default: false, // Default permission is false
               },
               remove: {
                    type: Boolean,
                    default: false, // Default permission is false
               },
          },
     },
     {
          timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
     }
);

// Ensure the model is only created once
const User =
     (mongoose.models.user as mongoose.Model<User>) ||
     mongoose.model<User>("user", userSchema);

export default User;
