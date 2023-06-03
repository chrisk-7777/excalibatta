import { SpriteSheet, Vector, vec } from 'excalibur';

import { GameObject } from './game-object';
import { Level } from '../services/level';
import { TILES } from '../helpers/tiles';
import { Resources, TileSetGrid32 } from '../services/resources';
import { DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, FourDirections } from '../helpers/consts';

import { TileMover } from '../systems/tile-mover';

export class GroundEnemy extends GameObject {
  tickBetweenMovesInterval: number;
  ticksUntilNextMove: number;
  turnsAroundAtWater: boolean;
  mover: TileMover;

  constructor(pos: Vector, level: Level, type: string) {
    super(pos, level, type);

    this.zOffset = 100;
    this.tickBetweenMovesInterval = 28;
    this.ticksUntilNextMove = this.tickBetweenMovesInterval;
    this.turnsAroundAtWater = true;
    this.interactsWithGround = true;

    // TODO Initial direction should be from config
    // TODO needs to pass to tile mover constructor
    // this.mover.movingPixelDirection = /*properties.initialDirection ??*/ DIRECTION_RIGHT;

    this.mover = new TileMover(this);
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

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.graphics.add(DIRECTION_LEFT, spriteSheet.getSprite(TILES.ENEMY_LEFT[0] / 2, TILES.ENEMY_LEFT[1] / 2)!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.graphics.add(DIRECTION_RIGHT, spriteSheet.getSprite(TILES.ENEMY_RIGHT[0] / 2, TILES.ENEMY_RIGHT[1] / 2)!);
  }

  handleCollisions(): void {
    this.mover.handleCollisions();
  }

  tickAttemptAiMove() {
    this.checkForOverlapWithHero();

    if (this.ticksUntilNextMove > 0) {
      this.ticksUntilNextMove -= 1;
      return;
    }
    this.internalMoveRequested(this.mover.movingPixelDirection);
  }

  checkForOverlapWithHero() {
    if (this.tile.distance(this.level.player!.tile) === 0) {
      this.level.setDeathOutcome(this.type);
    }
  }

  internalMoveRequested(direction: FourDirections) {
    //Attempt to start moving
    if (this.mover.movingPixelsRemaining > 0) {
      return;
    }

    if (this.isSolidAtNextPosition(direction)) {
      this.switchDirection();
      return;
    }

    //Start the move
    this.ticksUntilNextMove = this.tickBetweenMovesInterval;
    this.mover.reset(direction);
  }

  switchDirection() {
    const currentDir = this.mover.movingPixelDirection;

    // Horizontal change
    if (currentDir === DIRECTION_LEFT || currentDir === DIRECTION_RIGHT) {
      this.mover.movingPixelDirection = currentDir === DIRECTION_LEFT ? DIRECTION_RIGHT : DIRECTION_LEFT;
      return;
    }
    // Vertical change
    this.mover.movingPixelDirection = currentDir === DIRECTION_UP ? DIRECTION_DOWN : DIRECTION_UP;
  }

  onPreUpdate(): void {
    this.mover.earlyUpdate();
    this.tickAttemptAiMove();
    this.mover.lateUpdate();
  }

  onPostUpdate(): void {
    this.graphics.layers.get('foreground').use(this.mover.movingPixelDirection, { anchor: vec(0.25, 0.6) });
  }
}
