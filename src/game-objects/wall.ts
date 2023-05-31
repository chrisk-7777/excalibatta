import { Vector } from 'excalibur';

import { CELL_SIZE, LEVEL_THEMES, THEME_TILES_MAP } from '../helpers/consts';
import { GameObject } from './game-object';
import { Level } from '../services/level';
import { TileSetGrid16 } from '../services/resources';

export class Wall extends GameObject {
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

  onInitialize(): void {
    // TODO fix up
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.graphics.use(this.generateGraphic(THEME_TILES_MAP[LEVEL_THEMES.YELLOW].WALL, TileSetGrid16));
  }

  isSolidForBody() {
    return true;
  }
}
