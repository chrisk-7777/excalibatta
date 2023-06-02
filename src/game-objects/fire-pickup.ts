import { GameObject } from './game-object';
import { PLACEMENT_TYPE_FIRE_PICKUP } from '../helpers/consts';
import { TileSetGrid16 } from '../services/resources';
import { TILES } from '../helpers/tiles';

export class FirePickup extends GameObject {
  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.FIRE_PICKUP, TileSetGrid16));
  }

  addsItemToInventoryOnCollide(): string {
    return PLACEMENT_TYPE_FIRE_PICKUP;
  }
}
