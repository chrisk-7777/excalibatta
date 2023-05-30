import { Sprite, SpriteSheet, Vector, vec } from 'excalibur';

import { GameObject } from './game-object';
import { Level } from '../services/level';
import { PLACEMENT_TYPE_KEY_GREEN } from '../helpers/consts';
import { Resources, TileSetGrid16 } from '../services/resources';
import { TILES } from '../helpers/tiles';

export class GreenKeyPickup extends GameObject {
  constructor(pos: Vector, level: Level, type: string) {
    super({
      pos,
      width: 16,
      height: 16,
      anchor: vec(0, 0),
      level,
      type,
    });
  }

  onInitialize(): void {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.TileSet,
      grid: TileSetGrid16,
    });

    this.graphics.use(spriteSheet.getSprite(TILES.GREEN_KEY[0], TILES.GREEN_KEY[1]) as Sprite);
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_KEY_GREEN;
  }
}
