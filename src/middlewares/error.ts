import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../errors/custom.js';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Internal server error' });
  }
};
