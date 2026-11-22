import mongoose from 'mongoose';

let connectionPromise;

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not configured');
  }
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(uri, {
      bufferCommands: false,
      maxPoolSize: 5
    });
  }
  await connectionPromise;
  return mongoose;
}
