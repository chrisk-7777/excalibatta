import { PLACEMENT_TYPE_FLOUR } from '../helpers/consts';
import { GameObject } from './game-object';
import { TILES } from '../helpers/tiles';
import { TileSetGrid16 } from '../services/resources';

export class Flour extends GameObject {
  canBeStolen: boolean = false;

  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.FLOUR, TileSetGrid16));
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_FLOUR;
  }
}
