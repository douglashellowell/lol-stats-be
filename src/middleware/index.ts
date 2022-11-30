import { RequestHandler } from 'express';
import { LeagueRegion } from 'galeforce/dist/riot-api';
import CustomError from '../errorHandling/CustomError';
import { GameType, gameTypes, platforms } from '../types';

const isValidPlatform = (platform: unknown): platform is LeagueRegion => {
  // TODO: refactor - includes doesn't work??
  return platforms.some((plat) => plat === platform);
};

const isValidNumber = (num: unknown): num is number => {
  return !isNaN(Number(num));
};

const isValidGameType = (type: unknown): type is GameType => {
  return gameTypes.some((gameType) => gameType === type);
};

export const validateQueries: RequestHandler<
  {},
  {},
  {},
  {
    platform: string;
    type: string;
    count: number;
  }
> = (req, res, next) => {
  const { count, platform, type } = req.query;

  if (!count || !type || !platform) {
    next(
      new CustomError(400, 'you must provide count, type, platform queries')
    );
    return;
  }

  if (!isValidPlatform(platform)) {
    next(new CustomError(400, `platform ${platform} is invalid`));
    return;
  }

  if (!isValidGameType(type)) {
    next(new CustomError(400, `gametype ${type} is not a gametype`));
    return;
  }

  if (!isValidNumber(count)) {
    next(new CustomError(400, `count ${count} is not a number`));
    return;
  }

  next();
};
