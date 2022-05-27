import { AnimatedSprite, Loader } from 'pixi.js';

export enum SpriteSheets {
  pacmanSpriteSheet = 'pacmanSpriteSheet',
  ghostSpriteSheet = 'ghostSpriteSheet',
}

export type Assets = SpriteSheets;

const assetsLocationsMap: Record<Assets, string> = {
  [SpriteSheets.ghostSpriteSheet]: 'assets/spritesheets/ghost.json',
  [SpriteSheets.pacmanSpriteSheet]: 'assets/spritesheets/pacman.json',
};

export class AssetsLoader {
  public static readonly loader = new Loader();

  public static async load(): Promise<void> {
    return new Promise((resolve) => {
      const assetsLocations = Object.values(assetsLocationsMap);

      for (const assetLocation of assetsLocations) {
        AssetsLoader.loader.add(assetLocation);
      }

      AssetsLoader.loader.load(() => {
        resolve();
      });
    });
  }

  public static getAnimatedSprite(
    spriteSheetKey: SpriteSheets,
  ): AnimatedSprite | undefined {
    const spriteSheetLocation = assetsLocationsMap[spriteSheetKey];
    const resource = AssetsLoader.loader.resources[spriteSheetLocation];

    if (!resource.spritesheet?.animations) {
      return;
    }

    const animation = Object.values(resource.spritesheet.animations)[0];

    const sprite = new AnimatedSprite(animation);

    return sprite;
  }
}
