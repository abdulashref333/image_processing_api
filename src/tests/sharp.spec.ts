import sharp from '../utils/sharp';
import { promises as fsPromise } from 'fs';
import path from 'path';

const publicDirectory = path.join(__dirname, '../../public/images/');
describe('image processing suite', async () => {
  it('should resturn success true', async () => {
    const image = await fsPromise.readFile(publicDirectory + 'example.jpeg');
    const result = sharp.resize(image, 'example.jpeg', 300, 400);
    expect(result).toBeTruthy();
  });
});
