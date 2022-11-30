import { RequestHandler } from 'express';
import { LeagueRegion } from 'galeforce/dist/riot-api';
import CustomError from '../errorHandling/CustomError';
import {
  fetchMatchIdsByPuuid,
  selectStatsBySummonerName,
} from '../models/lol.model';
import { GameType } from '../types';

export const getStatsBySummonerName: RequestHandler<
  { summonerName: string },
  {},
  {},
  { platform: LeagueRegion; type: GameType; count: number }
> = async (req, res, next) => {
  const { summonerName } = req.params;
  const { platform, type, count } = req.query;

  try {
    const stats = await selectStatsBySummonerName({
      summonerName,
      count,
      type: type,
      platform,
    });

    res.status(200).send({
      summoner: stats.summoner,
      matches: stats.matches,
    });
  } catch (err) {
    next(err);
  }
};

export const getMatchIdsByPuuid: RequestHandler<
  { puuid: string },
  {},
  {},
  { platform: LeagueRegion; type: GameType; count: number }
> = async (req, res, next) => {
  const { puuid } = req.params;
  const { count, type, platform } = req.query;

  try {
    const matchIds = await fetchMatchIdsByPuuid(puuid, {
      count,
      type,
      platform,
    });
    res.status(200).send({ matchIds });
  } catch (err) {
    next(err);
  }
};
