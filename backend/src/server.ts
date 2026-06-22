import { app } from "./app.js";
import connectDB from "./config/db.js";
import { config } from "./config/config.js";

connectDB()
  .then(() => {
    // boot worker after DB is ready
    import("./workers/metadata.worker.js");

    app.listen(config.port || 8000, () =>
      console.log(`server is running at: ${config.port}`),
    );
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!! ", err);
  });
