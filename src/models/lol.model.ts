import { GameType } from '../types';

type SelectStatsBySummonerNameOptions = {
  summonerName: string;
  region: string;
  game_type: GameType;
  count: number;
};

export async function selectStatsBySummonerName({
  count,
  game_type,
  region,
  summonerName,
}: SelectStatsBySummonerNameOptions) {}
