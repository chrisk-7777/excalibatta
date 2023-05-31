import { Vector } from 'excalibur';

import { GameObject } from './game-object';
import { Level } from '../services/level';
import { CELL_SIZE, PLACEMENT_TYPE_KEY_GREEN } from '../helpers/consts';
import { TileSetGrid16 } from '../services/resources';
import { TILES } from '../helpers/tiles';

export class GreenKeyPickup extends GameObject {
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
    this.graphics.use(this.generateGraphic(TILES.GREEN_KEY, TileSetGrid16));
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_KEY_GREEN;
  }
}
