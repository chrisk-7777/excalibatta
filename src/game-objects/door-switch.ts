import { Vector, vec } from 'excalibur';
import { TILES } from '../helpers/tiles';
import { TileSetGrid16 } from '../services/resources';
import { GameObject } from './game-object';
import { Level } from '../services/level';

export class DoorSwitch extends GameObject {
  constructor(pos: Vector, level: Level, type: string) {
    super({
      pos,
      width: 16,
      height: 16,
      anchor: vec(0, 0),
      level,
      type,
    });
  }

  onInitialize(): void {
    this.graphics.use(this.generateGraphic(TILES.PURPLE_BUTTON, TileSetGrid16));
  }

  switchesDoorsOnCollide(body: GameObject): boolean {
    return body.interactsWithGround;
  }
}
