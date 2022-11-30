// import { GameType, Match, SummonerDTO, TPlatform } from '../types';
// import { platformToRegion } from './utils';

// export async function getSummonerByName(
//   platform: TPlatform,
//   summonerName: string
// ) {
//   const resource = `/lol/summoner/v4/summoners/by-name/${summonerName}`;

//   const summoner = await riotFetch<SummonerDTO>(platform, resource);

//   return summoner;
// }

// export async function getMatchIdsByPuuid(
//   platform: TPlatform,
//   puuid: string,
//   count: number,
//   game_type: GameType
// ) {
//   const resource = `/lol/match/v5/matches/by-puuid/${puuid}/ids`;

//   const region = platformToRegion(platform);

//   const matches = await riotFetch<string[]>(region, resource, {
//     count: count.toString(),
//     game_type,
//   });
//   return matches;
// }

// export async function getMatchByMatchId(platform: TPlatform, matchId: string) {
//   const resource = `/lol/match/v5/matches/${matchId}`;
//   const region = platformToRegion(platform);

//   const match = await riotFetch<Match>(region, resource);

//   return match;
// }
