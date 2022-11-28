import LeagueJS from 'leaguejs';

const leagueJs = new LeagueJS(process.env.RIOT_API_KEY);
// TODO - put this in the render config.

type SelectStatsBySummonerNameOptions = {
  summonerName: string;
  region: string;
  game_type: string;
  count: number;
};

export async function selectStatsBySummonerName({
  count,
  game_type,
  region,
  summonerName,
}: SelectStatsBySummonerNameOptions) {
  const summoner = await leagueJs.Summoner.gettingByName(summonerName);

  const matches = await leagueJs.Match.gettingMatchIdsByPuuid(
    summoner.puuid,
    region,
    { type: game_type, count }
  );

  const stats = await Promise.all(
    matches.map((matchId: string) => {
      return leagueJs.Match.gettingById(matchId, region, {
        forPuuid: summoner.puuid,
        forPlatformId: region,
      });
    })
  );

  return { stats, summoner };
}
