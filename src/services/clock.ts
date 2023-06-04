import { DEATH_TYPE_CLOCK } from '../helpers/consts';
import { G } from '../services/global';
import { Level } from '../services/level';

const TIME_PER_TICK = 16.6;
const WARNING_SOUND_SECONDS = 10;

export class Clock {
  secondsRemaining: number;
  level: Level;
  msRemainingInSecond: number;

  constructor(secondsRemaining: number, level: Level) {
    this.secondsRemaining = secondsRemaining;
    this.level = level;
    this.msRemainingInSecond = 1000;
  }

  tick() {
    this.msRemainingInSecond -= TIME_PER_TICK;
    if (this.msRemainingInSecond <= 0) {
      this.msRemainingInSecond = 1000;
      this.secondsRemaining -= 1;

      G.emit('ClockTick', { secondsRemaining: this.secondsRemaining });

      if (this.secondsRemaining <= 0) {
        this.level.setDeathOutcome(DEATH_TYPE_CLOCK);
        return;
      }

      if (this.secondsRemaining <= WARNING_SOUND_SECONDS) {
        console.log('BINK!');
      }
    }
  }
}
