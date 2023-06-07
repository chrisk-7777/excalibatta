// import { DevTool } from '@excaliburjs/dev-tools';
import { Color, DisplayMode, Engine } from 'excalibur';

import { CELL_SIZE, IS_DEBUG, SKIP_LOADER, THEME_BACKGROUNDS } from '../helpers/consts';
import { Level } from './level';
import { LevelManager } from './level-manager';

export class Game extends Engine {
  private static instance: Game;

  public levelManager: LevelManager;

  constructor() {
    super({
      displayMode: DisplayMode.FitContainer,
      width: CELL_SIZE * 16,
      height: CELL_SIZE * 9,
      antialiasing: false,
      suppressConsoleBootMessage: true,
      suppressPlayButton: SKIP_LOADER,
      canvasElementId: 'game',
      maxFps: 60,
      snapToPixel: true,
      backgroundColor: Color.fromHex(THEME_BACKGROUNDS.BLUE),
    });

    this.levelManager = new LevelManager(this);

    if (IS_DEBUG) {
      this.showDebug(true);
      // new DevTool(this);
    }
  }

  public get currentLevel(): Level {
    return this.levelManager.getCurrentLevel();
  }

  static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }
}
