import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import GoalsForm from "../components/GoalsForm";
import { getGoals, reset } from "../features/goals/goalSlice";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goal
  );
  // console.log(goals);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getGoals());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user?.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalsForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem goal={goal} key={goal._id} />
            ))}
          </div>
        ) : (
          <h3>You have not set any Goal Yet 🎆🎆🎆🎆</h3>
        )}
      </section>
    </>
  );
}
export default Dashboard;
