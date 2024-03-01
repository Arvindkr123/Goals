import asyncHandler from "express-async-handler";
import GoalModel from "../models/goals.models.js";

export const getGoals = asyncHandler(async (req, res, next) => {
  const goals = await GoalModel.find({ user: req.user._id });
  res.status(200).json(goals);
});

export const setGoals = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please provide a text field");
  }

  let goal = await GoalModel.create({
    text: req.body.text,
    user: req.user._id,
  });
  res.status(200).json({ goal: goal });
});

export const updateGoals = asyncHandler(async (req, res, next) => {
  const goal = await GoalModel.findById(req.params.id);

  // let user = await userModel.findById(req.user._id);
  // console.log(user._id, goal.user);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found!!");
  }

  // make sure that logged in user matches the goals user
  if (goal.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await GoalModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200);
  res.json(updatedGoal);
});

export const deleteGoals = asyncHandler(async (req, res, next) => {
  const goal = await GoalModel.findById(req.params.id);
  if (!goal) {
    res.status(404);
    throw new Error("Goal not found!!");
  }

  // let user = await userModel.findById(req.user._id);
  if (!req.user) {
    res.status(401);
    throw new Error("User not found!!");
  }

  // make sure that logged in user matches the goals user
  if (goal.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await GoalModel.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id });
});
