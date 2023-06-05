import { Actor, Engine } from 'excalibur';

import { DEATH_TYPE_CLOCK } from '../helpers/consts';
import { G } from '../services/global';
import { Level } from '../services/level';

export class Clock extends Actor {
  private ONE_SECOND_MS = 1000;

  private secondsRemaining: number;
  private level: Level;
  private msRemainingInSecond: number;

  constructor(secondsRemaining: number, level: Level) {
    super();
    this.secondsRemaining = secondsRemaining;
    this.level = level;
    this.msRemainingInSecond = this.ONE_SECOND_MS;
  }

  onPostUpdate(_engine: Engine, delta: number): void {
    this.msRemainingInSecond -= delta;

    if (this.msRemainingInSecond <= 0) {
      this.msRemainingInSecond += this.ONE_SECOND_MS;
      this.secondsRemaining -= 1;
      G.emit('ClockTick', { secondsRemaining: this.secondsRemaining });

      if (this.secondsRemaining <= 0) {
        this.level.setDeathOutcome(DEATH_TYPE_CLOCK);
        return;
      }
    }
  }
}
