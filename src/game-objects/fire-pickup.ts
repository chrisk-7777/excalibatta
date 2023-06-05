import { GameObject } from './game-object';
import { PLACEMENT_TYPE_FIRE_PICKUP } from '../helpers/consts';
import { TILES } from '../helpers/tiles';
import { Vector } from 'excalibur';
import { Level } from '../services/level';

export class FirePickup extends GameObject {
  constructor(pos: Vector, level: Level, type: string) {
    super(pos, level, type);
    this.canBeStolen = true;
  }

  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.FIRE_PICKUP));
  }

  addsItemToInventoryOnCollide(): string {
    return PLACEMENT_TYPE_FIRE_PICKUP;
  }
}
