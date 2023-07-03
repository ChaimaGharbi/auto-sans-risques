import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  fullName: String,
  adresse: String,
  tel: String,
  ville: String,
});

export default mongoose.model("Client", clientSchema);
