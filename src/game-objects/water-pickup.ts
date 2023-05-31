import { Vector } from 'excalibur';

import { CELL_SIZE, PLACEMENT_TYPE_WATER_PICKUP } from '../helpers/consts';
import { GameObject } from './game-object';
import { Level } from '../services/level';
import { TileSetGrid16 } from '../services/resources';
import { TILES } from '../helpers/tiles';

export class WaterPickup extends GameObject {
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
    this.graphics.use(this.generateGraphic(TILES.WATER_PICKUP, TileSetGrid16));
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_WATER_PICKUP;
  }
}
