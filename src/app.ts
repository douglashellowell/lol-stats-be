import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import {
  getMatchIdsByPuuid,
  getStatsBySummonerName,
} from './controllers/lol.controller';
import CustomError from './errorHandling/CustomError';
import {
  handle500Errors,
  handleCustomerrors,
  handleRiotAuthErrors,
} from './errorHandling/errorMiddleware';
import { validateQueries } from './middleware';

const app = express();

app.use(cors());

// for dev and debug
app.use((req, _res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

app.get('/', (_req, res) => {
  res.send({ msg: 'hello there' });
});

app.get(
  '/stats/by-name/:summonerName',
  validateQueries,
  getStatsBySummonerName
);
app.get('/matchIds/by-puuid/:puuid', validateQueries, getMatchIdsByPuuid);

app.use(handleCustomerrors);
app.use(handleRiotAuthErrors);
app.use(handle500Errors);

export default app;
