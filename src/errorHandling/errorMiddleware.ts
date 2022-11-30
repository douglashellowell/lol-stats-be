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

export const handleRiotErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(typeof err);

  if (err.message.includes('Riot API key')) {
    res.status(403).send({ message: 'Api key is invalid or expired' });
  } else if (err.message.includes('Data fetch failed with status code 404')) {
    res.status(404).send({ message: 'Data not found' });
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
