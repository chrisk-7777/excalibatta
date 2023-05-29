import { Sprite, SpriteSheet, Vector, vec } from 'excalibur';

import { CELL_SIZE, PLACEMENT_TYPE_FLOUR } from '../helpers/consts';
import { GameObject } from './game-object';
import { Level } from '../services/level';
import { Resources, TileSetGrid16 } from '../services/resources';
import { TILES } from '../helpers/tiles';

export class Flour extends GameObject {
  canBeStolen: boolean = false;

  constructor(pos: Vector, level: Level) {
    super({
      pos,
      width: CELL_SIZE,
      height: CELL_SIZE,
      anchor: vec(0, 0),
      level,
    });
  }

  onInitialize(): void {
    const spriteSheet = SpriteSheet.fromImageSource({ image: Resources.TileSet, grid: TileSetGrid16 });
    this.graphics.use(spriteSheet.getSprite(TILES.FLOUR[0], TILES.FLOUR[1]) as Sprite);
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_FLOUR;
  }
}
