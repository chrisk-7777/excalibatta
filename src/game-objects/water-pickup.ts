import { Sprite, SpriteSheet, Vector, vec } from 'excalibur';

import { CELL_SIZE, PLACEMENT_TYPE_WATER_PICKUP } from '../helpers/consts';
import { GameObject } from './game-object';
import { Level } from '../services/level';
import { Resources, TileSetGrid16 } from '../services/resources';
import { TILES } from '../helpers/tiles';

export class WaterPickup extends GameObject {
  constructor(pos: Vector, level: Level, type: string) {
    super({
      pos,
      width: CELL_SIZE,
      height: CELL_SIZE,
      anchor: vec(0, 0),
      level,
      type,
    });
  }

  onInitialize(): void {
    const spriteSheet = SpriteSheet.fromImageSource({ image: Resources.TileSet, grid: TileSetGrid16 });
    this.graphics.use(spriteSheet.getSprite(TILES.WATER_PICKUP[0], TILES.WATER_PICKUP[1]) as Sprite);
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_WATER_PICKUP;
  }
}
