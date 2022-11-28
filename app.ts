import express from 'express';
import { getStatsBySummonerName } from './controllers/lol.controller';

const app = express();

app.get('/', (req, res, next) => {
  res.send({ msg: 'hello there' });
});

app.get('/lol/by-name/:summonerName', getStatsBySummonerName);

export default app;
