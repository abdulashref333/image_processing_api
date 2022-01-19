import express from "express";
import routes from "./routes/index";

const app = express();
const port = 3000;

// routes
app.use("/api", routes);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}/api/`);
});

export default app;
