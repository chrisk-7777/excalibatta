import { TILES } from '../helpers/tiles';
import { GameObject } from './game-object';

export class DoorSwitch extends GameObject {
  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.PURPLE_BUTTON));
  }

  switchesDoorsOnCollide(body: GameObject): boolean {
    return body.interactsWithGround;
  }
}
