import { RequestHandler } from 'express';
import { selectStatsBySummonerName } from '../models/lol.model';
import { GameType } from '../types';

export const getStatsBySummonerName: RequestHandler<
  { summonerName: string },
  {},
  {},
  { region: string; game_type: GameType; count: number }
> = async (req, res, next) => {
  const { summonerName } = req.params;
  const { region, game_type, count } = req.query;

  try {
    const stats = await selectStatsBySummonerName({
      summonerName,
      count,
      game_type,
      region,
    });

    res.status(200).send({ stats });
  } catch (err) {
    next(err);
  }
};
