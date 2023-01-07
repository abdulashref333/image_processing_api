import { Request, Response } from 'express';

/*
  - simple logger middleware.
*/
const logger = (req: Request, res: Response, next: () => void) => {
  const { url } = req;
  console.log('**********************');
  console.log(`${url} was visited`);
  console.log('**********************');
  next();
};

export default logger;
