import express from "express";
import routes from "./routes/index";
import dotenv from "dotenv";
import logger from "./utils/logger";
import path from "path";
import exp from "constants";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "../public");

//middlewars
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

// routes
app.use("/api", routes);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}/api/`);
});

export default app;
