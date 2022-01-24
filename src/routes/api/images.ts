import express from "express";
import imageController from "../../controller/imagesController";
import multer from "multer";
import path from "path";

const publicDirectory = path.join(__dirname, "../../../public/images/");
// const publicPath = `${process.cwd()}/public/images`;

// const upload = multer({ dest: `images/` });
const images = express.Router();

var storage = multer.diskStorage({
  destination: publicDirectory,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

images.get("/", (req, res) => {
  res.send("images !");
});

images.get("/thumnail", imageController.getThumnail);
images.post(
  "/uploadImage",
  upload.single("avatar"),
  imageController.uploadImage
);

export default images;
