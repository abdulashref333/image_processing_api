import { promises as fsPromise } from 'fs';
import path from 'path';
import sharp from '../utils/sharp';

const publicDirectory = path.join(__dirname, '../../public/images/');

describe('image resizing suite', async () => {
  it('should return true', async () => {
    const image = await fsPromise.readFile(`${publicDirectory}example.jpeg`);
    const result = await sharp.resize(image, 'example.jpeg', 300, 400);
    expect(result).toBeTruthy();
  });

  it('should return true', async () => {
    const image = await fsPromise.readFile(`${publicDirectory}example.jpeg`);
    const result = await sharp.resize(image, 'example', 300, 400);
    expect(result).toBeTruthy();
  });

  it('should return error when there is no file name', async () => {
    const image = await fsPromise.readFile(`${publicDirectory}example.jpeg`);
    const result = (await sharp.resize(image, '', 300, 400)) as Error;

    expect(result.message).toBe('imgae file name is missing');
  });

  it('should return error when there is no image', async () => {
    const image = Buffer.from('');
    const result = (await sharp.resize(image, 'example', 300, 400)) as Error;
    expect(result.message).toBe('Input Buffer is empty');
  });
});
