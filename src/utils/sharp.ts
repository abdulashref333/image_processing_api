import path from 'path';
import sharp from 'sharp';

const ThumnailDir = path.join(__dirname, '../../thumbnails/');

const resize = async (image: Buffer, filename: string, width: number, height: number): Promise<boolean | Error> => {
  try {
    if (filename.length === 0) {
      throw new Error('imgae file name is missing');
    }
    await sharp(image)
      .resize(width, height)
      .jpeg()
      .toFile(`${ThumnailDir + filename}_${width}.jpeg`);
    return true;
  } catch (error) {
    return error as Error;
  }
};

export default {
  resize,
};
