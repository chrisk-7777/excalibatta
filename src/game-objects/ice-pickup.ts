import { GameObject } from './game-object';
import { PLACEMENT_TYPE_ICE_PICKUP } from '../helpers/consts';
import { TileSetGrid16 } from '../services/resources';
import { TILES } from '../helpers/tiles';

export class IcePickup extends GameObject {
  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.ICE_PICKUP, TileSetGrid16));
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_ICE_PICKUP;
  }
}
