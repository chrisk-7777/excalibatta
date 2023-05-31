import { Engine, Vector } from 'excalibur';

import { GameObject } from './game-object';
import { Level } from '../services/level';
import { BODY_SKINS, CELL_SIZE, PLACEMENT_TYPE_FIRE_PICKUP, PLACEMENT_TYPE_HERO } from '../helpers/consts';
import { TileSetGrid16 } from '../services/resources';
import { TILES } from '../helpers/tiles';

export class FireTile extends GameObject {
  private frames = [TILES.FIRE1, TILES.FIRE2, TILES.FIRE3];
  private frameDuration: number = 5;

  constructor(pos: Vector, level: Level, type: string) {
    super({
      pos,
      width: CELL_SIZE,
      height: CELL_SIZE,
      anchor: Vector.Zero,
      level,
      type,
    });
  }

  onInitialize(): void {
    this.frames.forEach((frame, i) => {
      this.graphics.add(i.toString(), this.generateGraphic(frame, TileSetGrid16));
    });
  }

  damagesBodyOnCollide(body: GameObject): boolean {
    const { inventory } = this.level;
    if (body.type === PLACEMENT_TYPE_HERO && !inventory.has(PLACEMENT_TYPE_FIRE_PICKUP)) {
      return true;
    }

    // if (body.type === PLACEMENT_TYPE_CIABATTA) {
    //   return this.type;
    // }

    return false;
  }

  changesHeroSkinOnCollide() {
    return BODY_SKINS.FIRE;
  }

  onPostUpdate(engine: Engine): void {
    const t = Math.floor(engine.clock.now() / 100 / this.frameDuration) % this.frames.length;
    this.graphics.use(t.toString());
  }
}
