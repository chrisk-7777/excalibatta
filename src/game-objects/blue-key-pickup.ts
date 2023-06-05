import { GameObject } from './game-object';
import { PLACEMENT_TYPE_KEY_BLUE } from '../helpers/consts';
import { TILES } from '../helpers/tiles';
import { Vector } from 'excalibur';
import { Level } from '../services/level';

export class BlueKeyPickup extends GameObject {
  constructor(pos: Vector, level: Level, type: string) {
    super(pos, level, type);
    this.canBeStolen = true;
  }

  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.BLUE_KEY));
  }

  addsItemToInventoryOnCollide(): string {
    return PLACEMENT_TYPE_KEY_BLUE;
  }
}
