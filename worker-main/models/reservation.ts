import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  phone: {
    type: String,
  },
  typeCar: {
    type: String,
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
  },
  link: {
    type: String,
  },
  date: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  rapportId: { type: mongoose.Types.ObjectId, ref: "Rapport" },
});

export default mongoose.model("Reservation", reservationSchema);
