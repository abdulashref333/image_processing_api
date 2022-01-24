import { Request, Response } from "express";
import { promises as fsPromise } from "fs";
import path from "path";
import sharp from "sharp";

const publicDirectory = path.join(__dirname, "../../public/images/");
const ThumnailDir = path.join(__dirname, "../../thumbnails/");

const getThumnail = (req: Request, res: Response, next: Function): void => {
  res.send("Hello, Thumnail");
};

const uploadImage = async (
  req: Request,
  res: Response,
  next: Function
): Promise<void> => {
  try {
    const image = await fsPromise.readFile(
      publicDirectory + req.file?.filename
    );
    const imageName = `${req.file?.filename.split(".")[0]}_${req.query.width}.${
      req.file?.filename.split(".")[1]
    }`;
    sharp(image)
      .resize(
        parseInt((req.query.width as string) || "300"),
        parseInt((req.query.height as string) || "300")
      )
      .toFile(ThumnailDir + imageName)
      .then(async (data) => {
        const thumbnail = await fsPromise.readFile(ThumnailDir + imageName);
        res.contentType("image/jpeg");
        res.send(thumbnail);
      });
  } catch (error) {
    console.error(error);
  }
};
export default {
  getThumnail,
  uploadImage,
};
