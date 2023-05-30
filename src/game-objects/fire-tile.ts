import { Sprite, SpriteSheet, Vector, vec } from 'excalibur';

import { GameObject } from './game-object';
import { Level } from '../services/level';
import { PLACEMENT_TYPE_CIABATTA, PLACEMENT_TYPE_FIRE_PICKUP, PLACEMENT_TYPE_HERO } from '../helpers/consts';
import { Resources, TileSetGrid16 } from '../services/resources';
import { TILES } from '../helpers/tiles';
import { Player } from './player';

export class FireTile extends GameObject {
  constructor(pos: Vector, level: Level, type: string) {
    super({
      pos,
      width: 16,
      height: 16,
      anchor: vec(0, 0),
      level,
      type,
    });
  }

  onInitialize(): void {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.TileSet,
      grid: TileSetGrid16,
    });

    this.graphics.use(spriteSheet.getSprite(TILES.FIRE1[0], TILES.FIRE1[1]) as Sprite);
  }

  damagesBodyOnCollide(body: GameObject): boolean {
    // const { inventory } = this.level;
    if (
      body.type === PLACEMENT_TYPE_HERO
      //  &&
      // !inventory.has(PLACEMENT_TYPE_FIRE_PICKUP)
    ) {
      return true;
    }

    // if (body.type === PLACEMENT_TYPE_CIABATTA) {
    //   return this.type;
    // }

    return false;
  }

  // changesHeroSkinOnCollide() {
  //   return BODY_SKINS.FIRE;
  // }
}
