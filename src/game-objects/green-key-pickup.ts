import { GameObject } from './game-object';
import { PLACEMENT_TYPE_KEY_GREEN } from '../helpers/consts';
import { TileSetGrid16 } from '../services/resources';
import { TILES } from '../helpers/tiles';

export class GreenKeyPickup extends GameObject {
  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.GREEN_KEY, TileSetGrid16));
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_KEY_GREEN;
  }
}
