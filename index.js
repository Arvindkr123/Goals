import app from "./src/app.js";
import { PORT } from "./src/config/config.js";
import connectDB from "./src/config/db.js";

connectDB()
  .then(() => {
    app.listen(PORT || 8080, () => {
      console.log("Server listening on port " + PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
