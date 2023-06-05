import { Vector } from 'excalibur';

import { GameObject } from './game-object';
import { Level } from '../services/level';
import { TILES } from '../helpers/tiles';

export class Celebration extends GameObject {
  frame: number;
  frames = [
    TILES.PARTICLE_1,
    TILES.PARTICLE_2,
    TILES.PARTICLE_3,
    TILES.PARTICLE_4,
    TILES.PARTICLE_5,
    TILES.PARTICLE_6,
    TILES.PARTICLE_7,
    TILES.PARTICLE_8,
    TILES.PARTICLE_9,
  ];

  constructor(pos: Vector, level: Level, type: string) {
    super(pos, level, type);
    this.frame = 0;
    this.zOffset = 200;
  }

  onInitialize(): void {
    this.frames.forEach((frame, i) => {
      this.graphics.add(i.toString(), this.generateGraphic(frame));
    });
  }

  onPreUpdate() {
    if (this.frame <= 7) {
      this.frame += 0.5;
      return;
    }
    this.kill();
  }

  onPostUpdate(): void {
    this.graphics.use(Math.ceil(this.frame).toString());
  }
}
