import express from 'express';
import { getStatsBySummonerName } from './controllers/lol.controller';

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`);

  next();
});

app.get('/', (req, res, next) => {
  res.send({ msg: 'hello there' });
});

app.get('/lol/by-name/:summonerName', getStatsBySummonerName);

export default app;
