import express from "express";
import routes from "./routes/index";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middlewars
app.use(express.json());

// routes
app.use("/api", routes);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}/api/`);
});

export default app;
