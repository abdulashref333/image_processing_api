import express from "express";
import imageController from "../../controller/imagesController";
import cache from "../../utils/cach";
import multer from "multer";
import path from "path";

const publicDirectory = path.join(__dirname, "../../../public/images/");

const images = express.Router();
const storage = multer.diskStorage({
  destination: publicDirectory,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// routes
images
  .get("/", cache(30), imageController.resizeImageOnPublic)
  .get("/thumbnail", cache(30), imageController.getThumnail)
  .post(
    "/uploadImage",
    [upload.single("avatar"), cache(30)],
    imageController.uploadImage
  );

export default images;
