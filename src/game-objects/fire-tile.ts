import { Engine } from 'excalibur';

import { GameObject } from './game-object';
import { BODY_SKINS, PLACEMENT_TYPE_FIRE_PICKUP, PLACEMENT_TYPE_HERO } from '../helpers/consts';
import { TILES } from '../helpers/tiles';

export class FireTile extends GameObject {
  private frames = [TILES.FIRE1, TILES.FIRE2, TILES.FIRE3];
  private frameDuration: number = 5;

  onInitialize(): void {
    this.frames.forEach((frame, i) => {
      this.graphics.add(i.toString(), this.generateGraphic(frame));
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
