import { GameObject } from './game-object';
import { PLACEMENT_TYPE_KEY_GREEN } from '../helpers/consts';
import { TILES } from '../helpers/tiles';
import { Vector } from 'excalibur';
import { Level } from '../services/level';

export class GreenKeyPickup extends GameObject {
  constructor(pos: Vector, level: Level, type: string) {
    super(pos, level, type);
    this.canBeStolen = true;
  }

  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.GREEN_KEY));
  }

  addsItemToInventoryOnCollide(): string {
    return PLACEMENT_TYPE_KEY_GREEN;
  }
}
