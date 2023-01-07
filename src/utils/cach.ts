import { Request, Response } from 'express';
import cache from 'memory-cache';

const memCache = new cache.Cache();
const cacheMiddleware = () => (req: Request, res: Response, next: () => void) => {
  let key = `__express__${req.originalUrl}` || req.url;
  if (key.includes('uploadImage')) {
    key = `${key}${req.file?.filename.split('.')[0]}_${req.body.width}_${req.body.height}`;
  }
  const cacheContent = memCache.get(key);
  if (cacheContent) {
    if (Buffer.isBuffer(cacheContent)) {
      res.contentType('image/jpeg');
      res.send(cacheContent);
    } else {
      res.send(cacheContent);
    }
  } else {
    next();
  }
};

const setCache = (duration: number, body: unknown, req: Request) => {
  let key = `__express__${req.originalUrl}` || req.url;
  if (key.includes('uploadImage')) {
    key = `${key}${req.file?.filename.split('.')[0]}_${req.body.width}_${req.body.height}`;
  }
  memCache.put(key, body, duration * 1000);
};
export default { cacheMiddleware, setCache };
