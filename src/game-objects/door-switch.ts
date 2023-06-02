import { TILES } from '../helpers/tiles';
import { TileSetGrid16 } from '../services/resources';
import { GameObject } from './game-object';

export class DoorSwitch extends GameObject {
  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.PURPLE_BUTTON, TileSetGrid16));
  }

  switchesDoorsOnCollide(body: GameObject): boolean {
    return body.interactsWithGround;
  }
}
