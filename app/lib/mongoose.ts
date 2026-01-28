// /app/lib/mongoose.ts
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined");
}

const uri: string = MONGODB_URI;

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

global.mongoose ||= { conn: null, promise: null };

export async function dbConnect(): Promise<Mongoose> {
  if (global.mongoose!.conn) {
    return global.mongoose!.conn;
  }

  if (!global.mongoose!.promise) {
    mongoose.set("autoIndex", true);

    global.mongoose!.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  const conn = await global.mongoose!.promise;
  global.mongoose!.conn = conn;

  console.log("✅ MongoDB connected:", conn.connection.host);

  return conn;
}
