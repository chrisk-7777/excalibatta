import { Vector } from 'excalibur';

import { GameObject } from './game-object';
import { Level } from '../services/level';
import { TILES } from '../helpers/tiles';

export class Door extends GameObject {
  constructor(pos: Vector, level: Level, type: string, data: any) {
    super(pos, level, type);
    this.isRaised = data.isRaised;
  }

  onInitialize(): void {
    this.graphics.add('closed', this.generateGraphic(TILES.PURPLE_DOOR_SOLID));
    this.graphics.add('open', this.generateGraphic(TILES.PURPLE_DOOR_OUTLINE));
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
