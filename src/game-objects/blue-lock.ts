import { Vector } from 'excalibur';

import { TILES } from '../helpers/tiles';
import { GameObject } from './game-object';
import { Level } from '../services/level';
import { PLACEMENT_TYPE_KEY_BLUE } from '../helpers/consts';

export class BlueLock extends GameObject {
  collectInFrames: number;
  unlocked: boolean;

  constructor(pos: Vector, level: Level, type: string) {
    super(pos, level, type);
    this.collectInFrames = 0;
    this.unlocked = false;
  }

  onInitialize(): void {
    this.graphics.add('locked', this.generateGraphic(TILES.BLUE_LOCK));
    this.graphics.add('unlocked', this.generateGraphic(TILES.UNLOCKED_LOCK));
  }

  isSolidForBody(): boolean {
    return !this.unlocked;
  }

  canBeUnlocked() {
    return !this.unlocked && this.level.inventory.has(PLACEMENT_TYPE_KEY_BLUE);
  }

  unlock() {
    if (this.collectInFrames > 0) {
      return;
    }
    this.collectInFrames = 11;
  }

  onPreUpdate() {
    if (this.collectInFrames > 0) {
      this.collectInFrames -= 1;
      if (this.collectInFrames === 0) {
        this.unlocked = true;
      }
    }
  }

  onPostUpdate(): void {
    if (this.unlocked) {
      this.graphics.hide();
    } else {
      this.graphics.use(this.collectInFrames === 0 ? 'locked' : 'unlocked');
    }
  }
}
