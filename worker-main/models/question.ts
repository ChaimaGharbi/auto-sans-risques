import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Types.ObjectId, ref: "QuestionCategory" },
  question: String,
  note: Number,
  comment: String,
  typeInput: String,
  choices: [String],
  colors: [String],
});

export default mongoose.model("Question", questionSchema);
