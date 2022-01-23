import { Request, Response } from "express";

/*
  - simple logger middleware.
*/
const logger = (req: Request, res: Response, next: Function) => {
  const url = req.url;
  console.log(`${url} was visited`);
  next();
};

export default logger;
