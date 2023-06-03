import { PLACEMENT_TYPE_WATER_PICKUP } from '../helpers/consts';
import { GameObject } from './game-object';
import { TILES } from '../helpers/tiles';
import { Vector } from 'excalibur';
import { Level } from '../services/level';

export class WaterPickup extends GameObject {
  constructor(pos: Vector, level: Level, type: string, data: any) {
    super(pos, level, type);
    this.canBeStolen = true;
  }

  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.WATER_PICKUP));
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_WATER_PICKUP;
  }
}
