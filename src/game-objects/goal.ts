import { Sprite, SpriteSheet, Vector, vec } from 'excalibur';

import { CELL_SIZE } from '../helpers/consts';
import { GameObject } from './game-object';
import { Level } from '../services/level';
import { TILES } from '../helpers/tiles';
import { Flour } from './flour';
import { Resources, TileSetGrid16 } from '../services/resources';

export class Goal extends GameObject {
  constructor(pos: Vector, level: Level) {
    super({
      pos,
      width: CELL_SIZE,
      height: CELL_SIZE,
      anchor: vec(0, 0),
      level,
    });
  }

  get isDisabled() {
    const nonCollectedFlour = this.level.actors.find((p) => {
      return p instanceof Flour && p.active;
    });

    return nonCollectedFlour !== undefined;
  }

  completesLevelOnCollide() {
    return !this.isDisabled;
  }

  onInitialize(): void {
    const spriteSheet = SpriteSheet.fromImageSource({ image: Resources.TileSet, grid: TileSetGrid16 });

    this.graphics.add('disabled', spriteSheet.getSprite(TILES.GOAL_DISABLED[0], TILES.GOAL_DISABLED[1]) as Sprite);
    this.graphics.add('enabled', spriteSheet.getSprite(TILES.GOAL_ENABLED[0], TILES.GOAL_ENABLED[1]) as Sprite);
  }

  onPostUpdate(): void {
    this.graphics.show(this.isDisabled ? 'disabled' : 'enabled');
  }
}
