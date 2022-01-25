import express from "express";
import images from "./api/images";

const routes = express.Router();

// routes
routes.use("/images", images);

export default routes;
