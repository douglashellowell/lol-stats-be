import express, { NextFunction, Request, Response } from 'express';
import { getStatsBySummonerName } from './controllers/lol.controller';
import CustomError from './errorHandling/CustomError';

const app = express();

app.use((req, _res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

app.get('/', (_req, res) => {
  res.send({ msg: 'hello there' });
});

app.get('/lol/by-name/:summonerName', getStatsBySummonerName);

app.use(
  (
    err: Error | CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    if (err instanceof CustomError) {
      res.status(err.status).send(err.message);
    } else {
      console.log(err);
      res.status(500).send(JSON.stringify(err));
    }
  }
);

export default app;
