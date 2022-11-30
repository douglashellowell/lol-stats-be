import GaleforceModule from 'galeforce';
import { LeagueRegion, RiotRegion } from 'galeforce/dist/riot-api';
import { platformToRegion } from '../api/utils';
import { GameType } from '../types';

import dotenv from 'dotenv';

dotenv.config();

const galeforce = new GaleforceModule({
  'riot-api': {
    key: process.env.RIOT_API_KEY,
  },
  'rate-limit': {
    cache: {
      type: 'internal',
    },
  },
});

type SelectStatsBySummonerNameOptions = {
  summonerName: string;
  platform: LeagueRegion;
  type: GameType;
  count: number;
};

export async function selectStatsBySummonerName({
  count,
  type,
  platform,
  summonerName,
}: SelectStatsBySummonerNameOptions) {
  const summoner = await fetchSummonerBySummonerName(summonerName, platform);

  const matchIds = await fetchMatchIdsByPuuid(summoner.puuid, {
    count,
    type,
    platform,
  });

  const matches = await Promise.all(
    matchIds.map((matchId) => fetchMatchByMatchId(matchId, platform))
  );

  return { summoner, matchIds, matches };
}

export async function fetchMatchByMatchId(
  matchId: string,
  platform: LeagueRegion
) {
  const region = platformToRegion(platform);
  return await galeforce.lol.match
    .match()
    .region(region)
    .matchId(matchId)
    .exec();
}

export async function fetchSummonerBySummonerName(
  summonerName: string,
  platform: LeagueRegion
) {
  return await galeforce.lol
    .summoner()
    .region(platform)
    .name(summonerName)
    .exec();
}
export async function fetchMatchIdsByPuuid(
  puuid: string,
  {
    count,
    type,
    platform,
  }: { count: number; type: GameType; platform: LeagueRegion }
) {
  return await galeforce.lol.match
    .list()
    .region(RiotRegion.AMERICAS)
    .puuid(puuid)
    .query({ count, type })
    .exec();
}
