import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error Handler:", err.message, err.stack);
  res.status(500).send('Something broke!');
};