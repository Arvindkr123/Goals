import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add text value"],
    },
  },
  { timestamps: true }
);

const GoalModel = mongoose.model("Goals", goalSchema);

export default GoalModel; 
