import mongoose from "mongoose";
import { getMongoDbName, getMongoUri, hasMongo } from "./env";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cache;

export async function connectDb(): Promise<typeof mongoose> {
  if (!hasMongo()) {
    throw new Error("Database is not configured");
  }
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(getMongoUri(), {
      dbName: getMongoDbName(),
      bufferCommands: false,
    });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}

export function isDbReady(): boolean {
  return hasMongo() && mongoose.connection.readyState === 1;
}
