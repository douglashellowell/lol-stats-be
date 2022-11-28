import { RequestHandler } from 'express';
import { selectStatsBySummonerName } from '../models/lol.model';

export const getStatsBySummonerName: RequestHandler<
  { summonerName: string },
  {},
  {},
  { region: string; game_type: string; count: number }
> = async (req, res, next) => {
  const { summonerName } = req.params;
  const { region, game_type, count } = req.query;

  const stats = await selectStatsBySummonerName({
    summonerName,
    count,
    game_type,
    region,
  });

  res.status(200).send({ stats });
};
