import mongoose, { Schema, model, models } from "mongoose";

/**
 * 🔐 Authentication Log Interface
 */
export interface IAuthLog {
  userId?: mongoose.Types.ObjectId;

  event:
    | "login_success"
    | "login_failure"
    | "logout"
    | "password_reset_request"
    | "password_reset_success";

  ipHash?: string | null;
  userAgent?: string;

  location?: {
    city: string | null;
    region: string | null;
    country: string | null;
  };

  purpose: string;

  consent: {
    given: boolean;
    version: string;
    timestamp: Date;
  };

  createdAt?: Date;
}

/**
 * 📘 Schema
 */
const AuthLogSchema = new Schema<IAuthLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: false,
      index: true,
    },

    event: {
      type: String,
      required: true,
      index: true,
    },

    ipHash: {
      type: String,
      default: null,
      index: true,
    },

    userAgent: {
      type: String,
      default: "unknown",
    },

    location: {
      city: { type: String, default: null },
      region: { type: String, default: null },
      country: { type: String, default: null },
    },

    purpose: {
      type: String,
      default: "authentication-security",
      immutable: true,
    },

    consent: {
      given: { type: Boolean, required: true },
      version: { type: String, required: true },
      timestamp: { type: Date, required: true },
    },

    /**
     * 🧹 TTL index — auto-delete after 90 days (GDPR retention)
     */
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: "90d" },
    },
  },
  {
    versionKey: false,
  }
);

/**
 * 🔍 Indexes
 */
AuthLogSchema.index({ userId: 1, createdAt: -1 });
AuthLogSchema.index({ event: 1, createdAt: -1 });
AuthLogSchema.index({ createdAt: -1 });

const AuthLog =
  models.AuthLog || model<IAuthLog>("AuthLog", AuthLogSchema);

export default AuthLog;
