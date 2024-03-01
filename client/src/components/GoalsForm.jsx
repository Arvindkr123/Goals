import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

const GoalsForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    // console.log(text)
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            name="text"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};
export default GoalsForm;
