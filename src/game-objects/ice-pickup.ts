import { GameObject } from './game-object';
import { PLACEMENT_TYPE_ICE_PICKUP } from '../helpers/consts';
import { TILES } from '../helpers/tiles';
import { Vector } from 'excalibur';
import { Level } from '../services/level';

export class IcePickup extends GameObject {
  constructor(pos: Vector, level: Level, type: string, data: any) {
    super(pos, level, type);
    this.canBeStolen = true;
  }

  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.ICE_PICKUP));
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_ICE_PICKUP;
  }
}
