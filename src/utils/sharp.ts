import path from 'path';
import sharp from 'sharp';

const ThumnailDir = path.join(__dirname, '../../thumbnails/');

const resize = async (image: Buffer, filename: string, width: number, height: number): Promise<boolean> => {
  await sharp(image)
    .resize(width, height)
    .jpeg()
    .toFile(`${ThumnailDir + filename}_${width}.jpeg`)
    .catch(() => {
      return false;
    });
  return true;
};

export default {
  resize,
};
