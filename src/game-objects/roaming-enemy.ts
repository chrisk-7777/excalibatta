import { SpriteSheet, Vector, vec } from 'excalibur';

import { Level } from '../services/level';
import { TILES } from '../helpers/tiles';
import { Resources, TileSetGrid32 } from '../services/resources';
import { DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, FourDirections } from '../helpers/consts';
import { GroundEnemy } from './ground-enemy';
import { Collision } from '../services/collision';

export class RoamingEnemy extends GroundEnemy {
  constructor(pos: Vector, level: Level, type: string) {
    super(pos, level, type);
    this.tickBetweenMovesInterval = 48;
    this.ticksUntilNextMove = this.tickBetweenMovesInterval;
    this.turnsAroundAtWater = true;
    this.interactsWithGround = true;
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

    // TODO better types (!)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.graphics.use(spriteSheet.getSprite(TILES.ENEMY_ROAMING[0] / 2, TILES.ENEMY_ROAMING[1] / 2)!, {
      anchor: vec(0.25, 0.6),
    });
  }

  onPostMove(): void {
    // Do not choose next move if we are on an automoving tile
    const collision = new Collision(this, this.level);
    if (collision.withPlacementMovesBody()) {
      return;
    }

    // Randomly choose a new direction
    const directions = (
      [DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT] as Array<FourDirections>
    ).filter((direction) => {
      return !this.isSolidAtNextPosition(direction);
    });
    if (directions.length) {
      this.mover.movingPixelDirection = directions[Math.floor(Math.random() * directions.length)];
    }
  }

  onPostUpdate(): void {
    return;
  }
}
