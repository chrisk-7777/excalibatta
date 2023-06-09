import { Game } from './game';
import { Level } from './level';
import { Levels, levelsMap } from '../levels/levels-map';

export class LevelManager {
  private engine: Game;
  private currentLevelKey: number;
  private index: number;

  constructor(engine: Game) {
    this.engine = engine;
    this.currentLevelKey = 0;
    this.index = 0;
  }

  getCurrentLevel(): Level {
    if (!(this.engine.currentScene instanceof Level)) {
      throw new Error('Game engine expects type Level for its scenes');
    }
    return this.engine.currentScene;
  }

  start(): void {
    const data = levelsMap[Levels[this.currentLevelKey]];
    this.index++;

    this.engine.add(`level-${this.index}`, new Level(data));
    this.engine.goToScene(`level-${this.index}`);
  }

  resetCurrent(): void {
    this.start();
    this.engine.clock.start();
  }

  nextLevel(): void {
    this.currentLevelKey++;
    if (this.currentLevelKey >= Levels.length) {
      this.currentLevelKey = 0;
    }
    this.start();
    this.engine.clock.start();
  }
}
