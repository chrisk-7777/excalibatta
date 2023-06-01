import { Vector, vec } from 'excalibur';

import { CELL_SIZE } from '../helpers/consts';
import { GameObject } from './game-object';
import { Level } from '../services/level';
import { TILES } from '../helpers/tiles';
import { TileSetGrid16 } from '../services/resources';

export class Door extends GameObject {
  constructor(pos: Vector, level: Level, type: string, data: any) {
    super({
      pos,
      width: CELL_SIZE,
      height: CELL_SIZE,
      anchor: vec(0, 0),
      level,
      type,
    });

    this.isRaised = data.isRaised;
  }

  onInitialize(): void {
    this.graphics.add('closed', this.generateGraphic(TILES.PURPLE_DOOR_SOLID, TileSetGrid16));
    this.graphics.add('open', this.generateGraphic(TILES.PURPLE_DOOR_OUTLINE, TileSetGrid16));
  }

  toggleIsRaised(): void {
    this.isRaised = !this.isRaised;
  }

  isSolidForBody() {
    return this.isRaised;
  }

  onPostUpdate(): void {
    this.graphics.use(this.isRaised ? 'closed' : 'open');
  }
}
