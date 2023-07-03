import mongoose from "mongoose";

export default function mongoConnect() {
  const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?ssl=true`;

  return mongoose.connect(url);
}
