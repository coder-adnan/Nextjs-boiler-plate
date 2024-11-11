import mongoose, { Mongoose } from 'mongoose';

declare global {
  var _mongoClient: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI;

console.log(MONGODB_URI);
if (!MONGODB_URI) {
  throw new Error('Please add your Mongo URI to the .env file');
}

const mongoUri: string = MONGODB_URI;

let cached = global._mongoClient;

if (!cached) {
  cached = global._mongoClient = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
