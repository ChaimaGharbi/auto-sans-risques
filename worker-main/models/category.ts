import mongoose from "mongoose";

const QuestionCategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
  },
});

export default mongoose.model("QuestionCategory", QuestionCategorySchema);
