import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  nb_missions: {
    type: Number,
  },

  amount: {
    type: Number,
  },

  paymentId: {
    type: Number,
  },

  payId: {
    type: Number,
  },

  date: {
    type: Date,
  },

  expertId: { type: mongoose.Types.ObjectId, ref: "Expert" },

  factureId: { type: mongoose.Types.ObjectId, ref: "Facture" },
});

export default mongoose.model("Payment", paymentSchema);
