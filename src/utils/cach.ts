import cache from "memory-cache";
import { Request } from "express";

let memCache = new cache.Cache();
let cacheMiddleware = (duration: number) => {
  return (req: Request, res: any, next: Function) => {
    let key = "__express__" + req.originalUrl || req.url;
    if (key.includes("uploadImage")) {
      key = key + `${req.file?.filename.split(".")[0]}_${req.body.width}`;
    }
    let cacheContent = memCache.get(key);
    if (cacheContent) {
      res.contentType("image/jpeg");
      res.send(cacheContent);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body: any) => {
        memCache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

export default cacheMiddleware;
