import { Request, Response } from 'express';
import { promises as fsPromise } from 'fs';
import path from 'path';
import sharp from '../utils/sharp';
import valide from '../utils/validate';
import cache from '../utils/cach';

const publicDirectory = path.join(__dirname, '../../public/images/');
const ThumnailDir = path.join(__dirname, '../../thumbnails/');

const resizeImageOnPublic = async (req: Request, res: Response): Promise<void> => {
  try {
    let filename = req.query.filename as string;
    const width = parseInt((req.query.width as string) || '0');
    const height = parseInt((req.query.height as string) || '0');

    const { error } = valide.validate({ filename, width, height });
    if (error.length !== 0) {
      res.status(400).json({ error });
      return;
    }

    const image = await fsPromise.readFile(publicDirectory + filename);
    filename = filename.split('.')[0];
    await sharp.resize(image, filename, width, height);

    const thumbnadatail = await fsPromise.readFile(`${ThumnailDir + filename}_${width}.jpeg`);

    cache.setCache(30, thumbnadatail, req);

    res.contentType('image/jpeg');
    res.send(thumbnadatail);
  } catch (error) {
    res.status(500).send('something broked');
  }
};

const getThumnail = async (req: Request, res: Response): Promise<void> => {
  try {
    let filename = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    const { error } = valide.validate({ filename, width, height });
    if (error.length !== 0) {
      res.status(400).json({ error });
      return;
    }

    filename = filename.split('.')[0];
    const thumbnadatail = await fsPromise.readFile(`${ThumnailDir + filename}_${width}.jpeg`);
    cache.setCache(30, thumbnadatail, req);

    res.contentType('image/jpeg');
    res.send(thumbnadatail);
  } catch (error) {
    res.status(404).send('image not found!');
  }
};

const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    let filename = req.file?.filename as string;
    const width = parseInt(req.body.width || '0');
    const height = parseInt(req.body.height || '0');

    const { error } = valide.validate({ filename, width, height });
    if (error.length !== 0) {
      res.status(400).json({ error });
      return;
    }

    const image = await fsPromise.readFile(publicDirectory + filename);
    filename = filename.split('.')[0];
    await sharp.resize(image, filename, width, height);

    const thumbnadatail = await fsPromise.readFile(`${ThumnailDir + filename}_${width}.jpeg`);
    cache.setCache(30, thumbnadatail, req);

    res.contentType('image/jpeg');
    res.send(thumbnadatail);
  } catch (error) {
    res.status(500).send('something borken');
  }
};
export default {
  getThumnail,
  uploadImage,
  resizeImageOnPublic,
};
