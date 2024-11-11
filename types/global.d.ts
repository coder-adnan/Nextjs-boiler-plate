import mongoose from 'mongoose';

declare global {
  var _mongoClient: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

// To ensure the file is treated as a module
export {};
