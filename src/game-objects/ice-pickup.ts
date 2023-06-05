import { Vector } from 'excalibur';

import { GameObject } from './game-object';
import { Level } from '../services/level';
import { PLACEMENT_TYPE_ICE_PICKUP } from '../helpers/consts';
import { TILES } from '../helpers/tiles';

export class IcePickup extends GameObject {
  constructor(pos: Vector, level: Level, type: string) {
    super(pos, level, type);
    this.canBeStolen = true;
  }

  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.ICE_PICKUP));
  }

  addsItemToInventoryOnCollide(): string {
    return PLACEMENT_TYPE_ICE_PICKUP;
  }
}
