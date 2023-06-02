import { PLACEMENT_TYPE_WATER_PICKUP } from '../helpers/consts';
import { GameObject } from './game-object';
import { TileSetGrid16 } from '../services/resources';
import { TILES } from '../helpers/tiles';

export class WaterPickup extends GameObject {
  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.WATER_PICKUP, TileSetGrid16));
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_WATER_PICKUP;
  }
}
