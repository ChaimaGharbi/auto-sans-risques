import mongoose from "mongoose";

const expertSchema = new mongoose.Schema({
  fullName: String,
  adresse: String,
  tel: String,
  ville: String,
  signature: String,
});

export default mongoose.model("Expert", expertSchema);
