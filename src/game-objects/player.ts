import { Animation, Engine, Input, Sprite, SpriteSheet, Vector, vec } from 'excalibur';

import { Collision } from '../services/collision';
import { GameObject } from './game-object';
import { Level } from '../services/level';
import { Resources, TileSetGrid32 } from '../services/resources';
import { TILES } from '../helpers/tiles';
import * as CONSTS from '../helpers/consts';
import soundsManager, { SFX } from '../services/sounds';

const heroSkinMap = {
  [CONSTS.BODY_SKINS.NORMAL]: [TILES.HERO_LEFT, TILES.HERO_RIGHT],
  [CONSTS.BODY_SKINS.WATER]: [TILES.HERO_WATER_LEFT, TILES.HERO_WATER_RIGHT],
  [CONSTS.BODY_SKINS.FIRE]: [TILES.HERO_FIRE_LEFT, TILES.HERO_FIRE_RIGHT],
  [CONSTS.BODY_SKINS.DEATH]: [TILES.HERO_DEATH_LEFT, TILES.HERO_DEATH_RIGHT],
  [CONSTS.BODY_SKINS.SCARED]: [TILES.HERO_DEATH_LEFT, TILES.HERO_DEATH_RIGHT],
  [CONSTS.BODY_SKINS.ICE]: [TILES.HERO_ICE_LEFT, TILES.HERO_ICE_RIGHT],
  [CONSTS.BODY_SKINS.CONVEYOR]: [TILES.HERO_CONVEYOR_LEFT, TILES.HERO_CONVEYOR_RIGHT],
  [CONSTS.BODY_SKINS.TELEPORT]: [TILES.HERO_TELEPORT_LEFT, TILES.HERO_TELEPORT_RIGHT],
  [CONSTS.HERO_RUN_1]: [TILES.HERO_RUN_1_LEFT, TILES.HERO_RUN_1_RIGHT],
  [CONSTS.HERO_RUN_2]: [TILES.HERO_RUN_2_LEFT, TILES.HERO_RUN_2_RIGHT],
} as const;

export class Player extends GameObject {
  canCollectItems: boolean;
  canCompleteLevel: boolean;
  direction: typeof CONSTS.DIRECTION_LEFT | typeof CONSTS.DIRECTION_RIGHT;
  interactsWithGround: boolean;
  isDead: boolean;
  movingPixelDirection: CONSTS.FourDirections;
  movingPixelsRemaining: number;
  skin: keyof typeof heroSkinMap;
  spriteWalkFrame: 0 | 1;
  travelPixelsPerFrame: number;

  constructor(pos: Vector, level: Level) {
    super({
      pos,
      width: 16,
      height: 16,
      anchor: vec(0, 0),
      level,
    });

    this.zOffset = 100;

    this.canCollectItems = true;
    this.canCompleteLevel = true;
    this.direction = CONSTS.DIRECTION_RIGHT;
    this.interactsWithGround = true;
    this.isDead = false;
    this.movingPixelDirection = CONSTS.DIRECTION_RIGHT;
    this.movingPixelsRemaining = 0;
    this.skin = CONSTS.BODY_SKINS.NORMAL;
    this.spriteWalkFrame = 0;
    this.travelPixelsPerFrame = 1.5;
  }

  onInitialize(): void {
    const playerSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.TileSet,
      grid: TileSetGrid32,
    });

    Object.entries(heroSkinMap).map(([skin, frames]) => {
      frames.forEach((frame, index) => {
        const leftX = frame[0] / 2;
        const leftY = frame[1] / 2;
        const key = `${skin}-${index === 0 ? CONSTS.DIRECTION_LEFT : CONSTS.DIRECTION_RIGHT}`;
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

  // Not used
  updateWalkFrame() {
    this.spriteWalkFrame = this.spriteWalkFrame === 1 ? 0 : 1;
  }

  getFrame() {
    return `${this.skin}-${this.direction}`;
  }

  // Body
  requestMovement(direction: CONSTS.FourDirections) {
    // console.log('req', direction, this.movingPixelsRemaining);
    //Attempt to start moving
    if (this.movingPixelsRemaining !== 0) {
      // console.log('🛑 req nope');
      return;
    }

    // Check for lock at next position
    // const possibleLock = this.getLockAtNextPosition(direction);
    // if (possibleLock) {
    //   possibleLock.unlock();
    //   return;
    // }

    //Make sure the next space is available
    if (this.isSolidAtNextPosition(direction)) {
      return;
    }

    // // Maybe hop out of non-normal skin
    // if (this.skin === BODY_SKINS.WATER) {
    //   const collision = this.getCollisionAtNextPosition(direction);
    //   if (!collision.withChangesHeroSkin()) {
    //     this.skin = BODY_SKINS.NORMAL;
    //   }
    // }

    //Start the move
    // console.log('🟢 req start');
    this.movingPixelsRemaining = 1;
    this.movingPixelDirection = direction;
    this.updateFacingDirection();
    // this.updateWalkFrame();
  }

  updateFacingDirection() {
    if (this.movingPixelDirection === CONSTS.DIRECTION_LEFT || this.movingPixelDirection === CONSTS.DIRECTION_RIGHT) {
      this.direction = this.movingPixelDirection;
    }
  }

  // tickMovingPixelProgress() {
  //   if (this.movingPixelsRemaining === 0) {
  //     return;
  //   }
  //   this.movingPixelsRemaining -= this.travelPixelsPerFrame;
  //   if (this.movingPixelsRemaining <= 0) {
  //     this.movingPixelsRemaining = 0;
  //     this.onDoneMoving();
  //   }
  // }

  handleCollisions() {
    const collision = new Collision(this, this.level);

    const collideThatAddsToInventory = collision.withPlacementAddsToInventory();
    if (collideThatAddsToInventory) {
      collideThatAddsToInventory.collect();
      // this.level.addPlacement({
      //   type: PLACEMENT_TYPE_CELEBRATION,
      //   x: this.x,
      //   y: this.y,
      // });
      soundsManager.playSfx(SFX.COLLECT);
    }
  }

  onDoneMoving() {
    //Update my x/y!
    // const { x, y } = directionUpdateMap[this.movingPixelDirection];
    // this.x += x;
    // this.y += y;
    this.movingPixelsRemaining = 0;
    this.handleCollisions();
    // this.onPostMove();
  }

  update(engine: Engine, delta: number): void {
    super.update(engine, delta);

    // console.log("***", this.movingPixelDirection);

    if (engine.input.keyboard.isHeld(Input.Keys.ArrowLeft)) {
      this.requestMovement(CONSTS.DIRECTION_LEFT);
    }
    if (engine.input.keyboard.isHeld(Input.Keys.ArrowRight)) {
      this.requestMovement(CONSTS.DIRECTION_RIGHT);
    }
    if (engine.input.keyboard.isHeld(Input.Keys.ArrowUp)) {
      this.requestMovement(CONSTS.DIRECTION_UP);
    }
    if (engine.input.keyboard.isHeld(Input.Keys.ArrowDown)) {
      this.requestMovement(CONSTS.DIRECTION_DOWN);
    }

    // this.tickMovingPixelProgress();
    // console.log('***', this.movingPixelsRemaining);

    if (this.movingPixelsRemaining === 1) {
      switch (this.movingPixelDirection) {
        case CONSTS.DIRECTION_LEFT:
          this.movingPixelsRemaining = 2;
          this.actions.moveBy(-CONSTS.CELL_SIZE, 0, 100).callMethod(() => this.onDoneMoving());
          break;
        case CONSTS.DIRECTION_RIGHT:
          this.movingPixelsRemaining = 2;
          this.actions.moveBy(CONSTS.CELL_SIZE, 0, 100).callMethod(() => this.onDoneMoving());
          break;
        case CONSTS.DIRECTION_DOWN:
          this.movingPixelsRemaining = 2;
          this.actions.moveBy(0, CONSTS.CELL_SIZE, 100).callMethod(() => this.onDoneMoving());
          break;
        case CONSTS.DIRECTION_UP:
          this.movingPixelsRemaining = 2;
          this.actions.moveBy(0, -CONSTS.CELL_SIZE, 100).callMethod(() => this.onDoneMoving());
          break;
      }
    }

    // console.log(this.pos.x);
    this.graphics.use(this.getFrame(), { anchor: vec(0.25, 0.5) });
  }
}
