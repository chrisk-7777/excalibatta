import { GameObject } from './game-object';
import { PLACEMENT_TYPE_KEY_GREEN } from '../helpers/consts';
import { TILES } from '../helpers/tiles';

export class GreenKeyPickup extends GameObject {
  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.GREEN_KEY));
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_KEY_GREEN;
  }
}
