import { Vector } from 'excalibur';

import { GameObject } from './game-object';
import { Level } from '../services/level';
import { PLACEMENT_TYPE_WATER_PICKUP } from '../helpers/consts';
import { TILES } from '../helpers/tiles';

export class WaterPickup extends GameObject {
  constructor(pos: Vector, level: Level, type: string) {
    super(pos, level, type);
    this.canBeStolen = true;
  }

  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.WATER_PICKUP));
  }

  addsItemToInventoryOnCollide(): string {
    return PLACEMENT_TYPE_WATER_PICKUP;
  }
}
