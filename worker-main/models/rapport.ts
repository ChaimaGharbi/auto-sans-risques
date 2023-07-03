import mongoose from "mongoose";
import "./expert";
import "./client";

const rapportSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  link: {
    type: String,
  },
  etat: {
    type: String,
  },
  date: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },

  images: [String],

  clientId: { type: mongoose.Types.ObjectId, ref: "Client" },

  expertId: { type: mongoose.Types.ObjectId, ref: "Expert" },
  reservationId: { type: mongoose.Types.ObjectId, ref: "Reservation" },
});

export default mongoose.model("Rapport", rapportSchema);
