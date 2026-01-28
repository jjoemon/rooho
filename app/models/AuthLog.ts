import mongoose, { Schema, model, models } from "mongoose";

export interface IAuthLog {
  userId?: mongoose.Types.ObjectId;
  email: string;
  role?: "user" | "admin";
  event: "login_success" | "login_failed" | "logout";
  ipAddress?: string;
  userAgent?: string;
  consent: boolean;
  createdAt?: Date;
}

const AuthLogSchema = new Schema<IAuthLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
    event: {
      type: String,
      enum: ["login_success", "login_failed", "logout"],
      required: true,
      index: true,
    },
    ipAddress: String,
    userAgent: String,
    consent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/**
 * 🔍 Compound indexes (VERY IMPORTANT)
 */
AuthLogSchema.index({ userId: 1, createdAt: -1 });
AuthLogSchema.index({ email: 1, event: 1, createdAt: -1 });
AuthLogSchema.index({ createdAt: -1 });

const AuthLog =
  models.AuthLog || model<IAuthLog>("AuthLog", AuthLogSchema);

export default AuthLog;
