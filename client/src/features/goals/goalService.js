import axios from "axios";

const createGoal = async (goal, token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //   console.log(goal, token);
  const response = await axios.post("/api/goals", goal, config);
  return response.data;
};

const getGoals = async (token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(token);
  const response = await axios.get("/api/goals", config);
  //console.log(response.data);
  return response.data;
};

export const goalServices = {
  createGoal,
  getGoals,
};
