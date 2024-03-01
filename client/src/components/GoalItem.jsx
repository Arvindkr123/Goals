const GoalItem = ({ goal }) => {
  console.log(goal);
  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-IN")}</div>
      <h2>{goal.text}</h2>
    </div>
  );
};
export default GoalItem;
