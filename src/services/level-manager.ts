import { Engine } from 'excalibur';
import { Level } from './level';
import { Levels, levelsMap } from '../levels/levels-map';

export class LevelManager {
  engine: Engine;
  currentLevelKey: number;
  index: number;

  constructor(engine: Engine) {
    this.engine = engine;
    this.currentLevelKey = 0;
    this.index = 0;
  }

  start() {
    const data = levelsMap[Levels[this.currentLevelKey]];
    this.index++;

    this.engine.add(`level-${this.index}`, new Level(data));
    this.engine.goToScene(`level-${this.index}`);
  }

  resetCurrent() {
    this.start();
    this.engine.clock.start();
  }

  nextLevel() {
    this.currentLevelKey++;
    if (this.currentLevelKey >= Levels.length) {
      this.currentLevelKey = 0;
    }
    this.start();
    this.engine.clock.start();
  }
}
