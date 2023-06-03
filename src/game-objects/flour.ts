import { PLACEMENT_TYPE_FLOUR } from '../helpers/consts';
import { GameObject } from './game-object';
import { TILES } from '../helpers/tiles';

export class Flour extends GameObject {
  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.FLOUR));
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_FLOUR;
  }
}
