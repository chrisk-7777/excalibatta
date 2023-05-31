import { Vector, vec } from 'excalibur';

import { LEVEL_THEMES, THEME_TILES_MAP } from '../helpers/consts';
import { GameObject } from './game-object';
import { Level } from '../services/level';
import { TileSetGrid16 } from '../services/resources';

export class Wall extends GameObject {
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.graphics.use(this.generateGraphic(THEME_TILES_MAP[LEVEL_THEMES.YELLOW].WALL, TileSetGrid16));
  }

  isSolidForBody() {
    return true;
  }
}
