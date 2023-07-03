import mongoose from "mongoose";
import sequence from "mongoose-sequence";

const AutoIncrement = sequence(mongoose);

const factureSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  payId: {
    type: Number,
  },
  link: {
    type: String,
  },
  etat: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

factureSchema.plugin(AutoIncrement, { inc_field: "id", start_seq: 100000 });

export default mongoose.model("Facture", factureSchema);
