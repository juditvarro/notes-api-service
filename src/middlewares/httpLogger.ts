import { Request, Response, NextFunction } from 'express';

export const httpLogger = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`,
  );
  next();
};
