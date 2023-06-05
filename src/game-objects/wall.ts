import { GameObject } from './game-object';
import { LEVEL_THEMES, THEME_TILES_MAP } from '../helpers/consts';
import { TileSetGrid16 } from '../services/resources';

export class Wall extends GameObject {
  onInitialize(): void {
    // TODO fix up
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.graphics.use(this.generateGraphic(THEME_TILES_MAP[LEVEL_THEMES.YELLOW].WALL, TileSetGrid16));
  }

  isSolidForBody(): true {
    return true;
  }
}
