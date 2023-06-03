import { SpriteSheet, Vector, vec } from 'excalibur';

import { Level } from '../services/level';
import { TILES } from '../helpers/tiles';
import { Resources, TileSetGrid32 } from '../services/resources';
import { DIRECTION_LEFT, DIRECTION_RIGHT } from '../helpers/consts';
import { GroundEnemy } from './ground-enemy';

export class FlyingEnemy extends GroundEnemy {
  constructor(pos: Vector, level: Level, type: string) {
    super(pos, level, type);

    this.tickBetweenMovesInterval = 20;
    this.ticksUntilNextMove = this.tickBetweenMovesInterval;
    this.turnsAroundAtWater = false;
    this.interactsWithGround = false;
  }

  onInitialize(): void {
    this.graphics.layers.create({ name: 'shadow', order: 1 });
    this.graphics.layers.create({ name: 'foreground', order: 2 });

    const shadow = this.generateGraphic(TILES.SHADOW);
    this.graphics.layers.get('shadow').show(shadow);

    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.TileSet,
      grid: TileSetGrid32,
    });

    this.graphics.add(
      DIRECTION_LEFT,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      spriteSheet.getSprite(TILES.ENEMY_FLYING_LEFT[0] / 2, TILES.ENEMY_FLYING_LEFT[1] / 2)!
    );
    this.graphics.add(
      DIRECTION_RIGHT,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      spriteSheet.getSprite(TILES.ENEMY_FLYING_RIGHT[0] / 2, TILES.ENEMY_FLYING_RIGHT[1] / 2)!
    );
  }

  onPostUpdate(): void {
    this.graphics.layers
      .get('foreground')
      .use(this.mover.movingPixelDirection, { anchor: vec(0.25, 0.6), offset: vec(0, -3) });
  }
}
