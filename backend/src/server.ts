import { app } from "./app.js";
import connectDB from "./config/db.js";
import { config } from "./config/config.js";

connectDB() //it is an async method , and whenever async method is completed a promise is returned
  .then(() => {
    app.listen(config.port || 8000, () =>
      console.log(`server is running at: ${config.port}`)
    );
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!! ", err);
  });
