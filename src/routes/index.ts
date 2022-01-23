import express from "express";
import images from "./api/images";

const routes = express.Router();

// routes
routes.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

routes.use("/images", images);

export default routes;
