import { RiotRegion } from 'galeforce/dist/riot-api';
import { TPlatform } from '../types';

export function platformToRegion(platform: TPlatform): RiotRegion {
  if (['na1', 'br1', 'la1', 'la2'].includes(platform))
    return RiotRegion.AMERICAS;
  if (['eun1', 'euw1', 'tr1', 'ru'].includes(platform))
    return RiotRegion.EUROPE;
  if (['kr', 'jp1'].includes(platform)) return RiotRegion.ASIA;
  if (['oc1'].includes(platform)) return RiotRegion.ESPORTS;
  else throw new Error('platform not recognised!');
}
