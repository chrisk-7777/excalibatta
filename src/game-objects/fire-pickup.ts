import { Sprite, SpriteSheet, Vector, vec } from 'excalibur';

import { GameObject } from './game-object';
import { Level } from '../services/level';
import { PLACEMENT_TYPE_FIRE_PICKUP } from '../helpers/consts';
import { Resources, TileSetGrid16 } from '../services/resources';
import { TILES } from '../helpers/tiles';

export class FirePickup extends GameObject {
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

    this.graphics.use(spriteSheet.getSprite(TILES.FIRE_PICKUP[0], TILES.FIRE_PICKUP[1]) as Sprite);
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_FIRE_PICKUP;
  }
}
