import { Vector } from 'excalibur';

import { CELL_SIZE, PLACEMENT_TYPE_FLOUR } from '../helpers/consts';
import { GameObject } from './game-object';
import { Level } from '../services/level';
import { TILES } from '../helpers/tiles';
import { TileSetGrid16 } from '../services/resources';

export class Flour extends GameObject {
  canBeStolen: boolean = false;

  constructor(pos: Vector, level: Level, type: string) {
    super({
      pos,
      width: CELL_SIZE,
      height: CELL_SIZE,
      anchor: Vector.Zero,
      level,
      type,
    });
  }

  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.FLOUR, TileSetGrid16));
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_FLOUR;
  }
}
