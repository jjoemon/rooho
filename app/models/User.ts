// app/models/User.ts
import mongoose, { Schema, models, model, Model } from "mongoose";
import bcrypt from "bcryptjs";

/**
 * 1️⃣ TypeScript interface
 */
export interface IUser {
  name?: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * 2️⃣ Mongoose schema (DEFINE FIRST)
 */
const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // 🔐 never return password by default
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

/**
 * 3️⃣ Middleware (AFTER schema definition)
 */
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

/**
 * 4️⃣ Export model (hot-reload safe)
 */
const User: Model<IUser> =
  models.User || model<IUser>("User", UserSchema);

export default User;
