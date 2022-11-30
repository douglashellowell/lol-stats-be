import { NextFunction, Request, Response } from 'express';
import CustomError from './CustomError';

export const handleCustomerrors = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
};

export const handleRiotAuthErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.message.includes('Riot API key')) {
    res.status(403).send({ message: 'Api key is expired' });
  } else {
    next(err);
  }
};

export const handle500Errors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  res.status(500).send({ message: 'Something went wrong, sorry.' });
};
