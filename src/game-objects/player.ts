import { Animation, Engine, Sprite, SpriteSheet, Vector, vec } from 'excalibur';

import { GameObject } from './game-object';
import { Level } from '../services/level';
import { Resources, TileSetGrid32 } from '../services/resources';
import { TILES } from '../helpers/tiles';
import {
  BODY_SKINS,
  HERO_RUN_1,
  HERO_RUN_2,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  heroSkinMap,
  FourDirections,
} from '../helpers/consts';
import { TileMover } from '../systems/tile-mover';
import { UserController } from '../systems/user-controller';

export class Player extends GameObject {
  private controller: UserController;
  private direction: typeof DIRECTION_LEFT | typeof DIRECTION_RIGHT;
  private spriteWalkFrame: 0 | 1;

  public isDead: boolean;
  public mover: TileMover;

  constructor(pos: Vector, level: Level, type: string) {
    super(pos, level, type);

    this.zOffset = 100;
    this.canCollectItems = true;
    this.canCompleteLevel = true;
    this.direction = DIRECTION_RIGHT;
    this.interactsWithGround = true;
    this.isDead = false;
    this.skin = BODY_SKINS.NORMAL;
    this.spriteWalkFrame = 0;
    this.canCompleteLevel = true;

    this.mover = new TileMover(this);
    this.controller = new UserController(this);
  }

  onInitialize(): void {
    const playerSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.TileSet,
      grid: TileSetGrid32,
    });

    this.graphics.layers.create({ name: 'shadow', order: 1 });
    this.graphics.layers.create({ name: 'foreground', order: 2 });

    const shadow = this.generateGraphic(TILES.SHADOW);
    this.graphics.layers.get('shadow').show(shadow);

    Object.entries(heroSkinMap).map(([skin, frames]) => {
      frames.forEach((frame, index) => {
        const leftX = frame[0] / 2;
        const leftY = frame[1] / 2;
        const key = `${skin}-${index}`;
        const animation = new Animation({
          frames: [
            {
              graphic: playerSpriteSheet.getSprite(leftX, leftY) as Sprite,
              duration: 1,
            },
          ],
        });
        this.graphics.add(key, animation);
      });
    });
  }

  handleCollisions(): void {
    this.mover.handleCollisions();
  }

  onAutoMovement(direction: FourDirections): void {
    this.controller.requestMovement(direction);
  }

  updateWalkFrame(): void {
    this.spriteWalkFrame = this.spriteWalkFrame === 1 ? 0 : 1;
  }

  getFrame(): string {
    const index = this.direction === DIRECTION_LEFT ? 0 : 1;

    if (this.level.deathOutcome) {
      return `${BODY_SKINS.DEATH}-${index}`;
    }

    if (this.mover.movingPixelsRemaining > 0 && this.skin === BODY_SKINS.NORMAL) {
      const walkKey = this.spriteWalkFrame === 0 ? HERO_RUN_1 : HERO_RUN_2;
      return `${walkKey}-${index}`;
    }

    return `${this.skin}-${index}`;
  }

  updateFacingDirection(): void {
    if (this.mover.movingPixelDirection === DIRECTION_LEFT || this.mover.movingPixelDirection === DIRECTION_RIGHT) {
      this.direction = this.mover.movingPixelDirection;
    }
  }

  takesDamage(deathType: string): void {
    this.level.setDeathOutcome(deathType);
  }

  getYTranslate(): number {
    // Stand on ground when not moving
    if (this.mover.movingPixelsRemaining === 0 || this.skin !== BODY_SKINS.NORMAL) {
      return 0;
    }

    // Elevate ramp up or down at beginning/end of movement
    const PIXELS_FROM_END = 2;
    if (this.mover.movingPixelsRemaining < PIXELS_FROM_END || this.mover.movingPixelsRemaining > 16 - PIXELS_FROM_END) {
      return -1;
    }

    // Highest in the middle of the movement
    return -2;
  }

  onPreUpdate(engine: Engine): void {
    this.mover.earlyUpdate();
    this.controller.update(engine);
    this.mover.lateUpdate();
  }

  onPostUpdate(): void {
    this.graphics.layers
      .get('foreground')
      .use(this.getFrame(), { anchor: vec(0.25, 0.6), offset: vec(0, this.getYTranslate()) });
  }

  startMoving(direction: FourDirections): void {
    this.mover.reset(direction);
  }

  onStartMoving(): void {
    this.updateFacingDirection();
    this.updateWalkFrame();
  }

  isMoving(): boolean {
    return this.mover.isMoving();
  }
}
