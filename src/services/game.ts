import { DevTool } from '@excaliburjs/dev-tools';
import { DisplayMode, Engine } from 'excalibur';

import { CELL_SIZE } from '../helpers/consts';
import { Level } from './level';
import { LevelManager } from './level-manager';

export class Game extends Engine {
  public levelManager: LevelManager;

  constructor(debug: boolean) {
    super({
      displayMode: DisplayMode.FitContainer,
      width: CELL_SIZE * 16,
      height: CELL_SIZE * 9,
      antialiasing: false,
      suppressConsoleBootMessage: true,
      suppressPlayButton: true,
      canvasElementId: 'game',
      maxFps: 60,
      snapToPixel: true,
    });

    this.levelManager = new LevelManager(this);

    if (debug) {
      this.showDebug(true);
      new DevTool(this);
    }
  }

  public get currentLevel(): Level {
    return this.levelManager.getCurrentLevel();
  }
}

export const game = new Game(false);
