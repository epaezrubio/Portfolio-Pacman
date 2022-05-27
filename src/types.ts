import type Navigo from 'navigo';
import type { IPointData, Ticker } from 'pixi.js';

import type { ApplicationState } from './shared/state/types';

export interface ApplicationInjects {
  state: ApplicationState;
  router: Navigo;
  ticker: Ticker;
}

export interface GameConfig {
  playerSpeed: number;
  wallColor: number;
  wallThickness: number;
  dotColor: number;
  pickDistance: number;
  collisionDistance: number;
  pageTransitionDuration: number;
  respawnLocation: IPointData;
  respawnEndLocations: IPointData[];
}
