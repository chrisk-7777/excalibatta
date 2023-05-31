import { Vector } from 'excalibur';

import { CELL_SIZE } from '../helpers/consts';
import { GameObject } from './game-object';
import { Level } from '../services/level';
import { TILES } from '../helpers/tiles';
import { Flour } from './flour';
import { TileSetGrid16 } from '../services/resources';

export class Goal extends GameObject {
  constructor(pos: Vector, level: Level, type: string) {
    super({
      pos,
      width: CELL_SIZE,
      height: CELL_SIZE,
      anchor: Vector.Zero,
      level,
      type,
    });
  }

  get isDisabled(): boolean {
    const nonCollectedFlour = this.level.actors.find((p) => {
      return p instanceof Flour && p.active;
    });

    return nonCollectedFlour !== undefined;
  }

  completesLevelOnCollide(): boolean {
    return !this.isDisabled;
  }

  onInitialize(): void {
    this.graphics.add('disabled', this.generateGraphic(TILES.GOAL_DISABLED, TileSetGrid16));
    this.graphics.add('enabled', this.generateGraphic(TILES.GOAL_ENABLED, TileSetGrid16));
  }

  onPostUpdate(): void {
    this.graphics.show(this.isDisabled ? 'disabled' : 'enabled');
  }
}
