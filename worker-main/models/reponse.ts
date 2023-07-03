import mongoose from "mongoose";
import "./question";

const reponseSchema = new mongoose.Schema({
  question: {
    type: String,
  },

  category_name: {
    type: String,
  },

  reponse: {
    type: String,
  },

  color: {
    type: String,
  },

  comment: {
    type: String,
  },

  date: {
    type: Date,
  },

  rapportId: { type: mongoose.Types.ObjectId, ref: "Rapport" },

  categoryId: { type: mongoose.Types.ObjectId, ref: "QuestionCategory" },

  questionId: { type: mongoose.Types.ObjectId, ref: "Question" },
});

export default mongoose.model("Reponse", reponseSchema);
