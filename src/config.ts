import type { GameConfig } from './types';

export const config: GameConfig = {
  playerSpeed: 5,
  wallColor: 0x2121de,
  wallThickness: 3,
  dotColor: 0xffb897,
  pageTransitionDuration: 500,
  collisionDistance: 20,
  pickDistance: 10,
  respawnLocation: {
    x: 14,
    y: 14.5,
  },
  respawnEndLocations: [
    { x: 13, y: 12 },
    { x: 14, y: 12 },
  ],
};
