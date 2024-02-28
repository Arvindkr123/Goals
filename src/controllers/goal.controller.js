import asyncHandler from "express-async-handler";
import GoalModel from "../models/goals.models.js";

export const getGoals = asyncHandler(async (req, res, next) => {
  const goals = await GoalModel.find({});
  res.status(200).json(goals);
});

export const setGoals = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please provide a text message");
  }

  let goal = await GoalModel.create({
    text: req.body.text,
  });
  res.status(200).json({ message: "add goal successfully", goal: goal });
});

export const updateGoals = asyncHandler(async (req, res, next) => {
  const goal = await GoalModel.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await GoalModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200);
  res.json({ message: "Updated goal successfully", updatedGoal });
});

export const deleteGoals = asyncHandler(async (req, res, next) => {
  await GoalModel.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ message: "deleted  Goal successfully", id: req.params.id });
});
