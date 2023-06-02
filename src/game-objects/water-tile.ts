import { Engine } from 'excalibur';

import { BODY_SKINS, PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_WATER_PICKUP } from '../helpers/consts';
import { GameObject } from './game-object';
import { TILES } from '../helpers/tiles';
import { TileSetGrid16 } from '../services/resources';

export class WaterTile extends GameObject {
  private frames = [TILES.WATER1, TILES.WATER2];
  private frameDuration: number = 5;

  onInitialize(): void {
    this.frames.forEach((frame, i) => {
      this.graphics.add(i.toString(), this.generateGraphic(frame, TileSetGrid16));
    });
  }

  isSolidForBody(body: GameObject): boolean {
    return body.turnsAroundAtWater ?? false;
  }

  damagesBodyOnCollide(body: GameObject): boolean {
    const { inventory } = this.level;
    return body.type === PLACEMENT_TYPE_HERO && !inventory.has(PLACEMENT_TYPE_WATER_PICKUP);
  }

  changesHeroSkinOnCollide() {
    return BODY_SKINS.WATER;
  }

  onPostUpdate(engine: Engine): void {
    const t = Math.floor(engine.clock.now() / 100 / this.frameDuration) % this.frames.length;
    this.graphics.use(t.toString());
  }
}
