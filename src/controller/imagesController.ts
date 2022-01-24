import { Request, Response } from "express";
import { promises as fsPromise } from "fs";
import path from "path";
import sharp from "sharp";

const publicDirectory = path.join(__dirname, "../../public/images/");
const ThumnailDir = path.join(__dirname, "../../thumbnails/");

const getThumnail = async (
  req: Request,
  res: Response,
  next: Function
): Promise<void> => {
  try {
    const imageInfo = {
      width: req.query.width,
      height: req.query.height,
      imageName: function () {
        return `${req.query.name}_${this.width}.jpg`;
      },
    };
    const thumbnadatail = await fsPromise.readFile(
      ThumnailDir + imageInfo.imageName()
    );
    res.contentType("image/jpeg");
    res.send(thumbnadatail);
  } catch (error) {
    console.error(error);
    res.status(404).send("image not found!");
  }
};

const uploadImage = async (
  req: Request,
  res: Response,
  next: Function
): Promise<void> => {
  try {
    const imageInfo = {
      width: parseInt(req.body.width || req.query.width || "0"),
      height: parseInt(req.body.height || req.query.height || "0"),
      imageName: function () {
        return `${req.file?.filename.split(".")[0]}_${this.width}.${
          req.file?.filename.split(".")[1]
        }`;
      },
    };
    const image = await fsPromise.readFile(
      publicDirectory + req.file?.filename
    );
    // check the cach first if it not found then do sharp process.
    if (imageInfo.width === 0 || imageInfo.height === 0) {
      res.contentType("image/jpeg");
      res.send(image);
      return;
    }
    sharp(image)
      .resize(imageInfo.width, imageInfo.height)
      .toFile(ThumnailDir + imageInfo.imageName())
      .then(async () => {
        const thumbnadatail = await fsPromise.readFile(
          ThumnailDir + imageInfo.imageName()
        );
        res.contentType("image/jpeg");
        res.send(thumbnadatail);
      });
  } catch (error) {
    console.error(error);
  }
};
export default {
  getThumnail,
  uploadImage,
};
