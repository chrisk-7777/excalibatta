import { Animation, Engine, Input, Sprite, SpriteSheet, Vector, vec } from 'excalibur';

import { Collision } from '../services/collision';
import { GameObject } from './game-object';
import { Level } from '../services/level';
import { Resources, TileSetGrid16, TileSetGrid32 } from '../services/resources';
import { TILES } from '../helpers/tiles';
import * as CONSTS from '../helpers/consts';
import soundsManager, { SFX } from '../services/sounds';

export const heroSkinMap = {
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
  isDead: boolean;
  movingPixelDirection: CONSTS.FourDirections;
  movingPixelsRemaining: number;
  skin: keyof typeof heroSkinMap;
  spriteWalkFrame: 0 | 1;
  travelPixelsPerFrame: number;

  constructor(pos: Vector, level: Level, type: string) {
    super({
      pos,
      width: CONSTS.CELL_SIZE,
      height: CONSTS.CELL_SIZE,
      anchor: vec(0, 0),
      level,
      type,
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
    this.canCompleteLevel = true;
  }

  onInitialize(): void {
    const playerSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.TileSet,
      grid: TileSetGrid32,
    });

    this.graphics.layers.create({ name: 'shadow', order: 1 });
    this.graphics.layers.create({ name: 'foreground', order: 2 });

    const shadow = this.generateGraphic(TILES.SHADOW, TileSetGrid16);
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

  updateWalkFrame() {
    this.spriteWalkFrame = this.spriteWalkFrame === 1 ? 0 : 1;
  }

  getFrame(): string {
    //Which frame to show?
    const index = this.direction === CONSTS.DIRECTION_LEFT ? 0 : 1;

    // If dead, show the dead skin
    if (this.level.deathOutcome) {
      return `${CONSTS.BODY_SKINS.DEATH}-${index}`;
    }

    //Use correct walking frame per direction
    if (this.movingPixelsRemaining > 0 && this.skin === CONSTS.BODY_SKINS.NORMAL) {
      const walkKey = this.spriteWalkFrame === 0 ? CONSTS.HERO_RUN_1 : CONSTS.HERO_RUN_2;
      return `${walkKey}-${index}`;
    }

    return `${this.skin}-${index}`;
  }

  // Body
  requestMovement(direction: CONSTS.FourDirections) {
    //Attempt to start moving
    if (this.movingPixelsRemaining > 0) {
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

    // Start the move
    this.movingPixelsRemaining = CONSTS.CELL_SIZE;
    this.movingPixelDirection = direction;
    this.updateFacingDirection();
    this.updateWalkFrame();
  }

  updateFacingDirection() {
    if (this.movingPixelDirection === CONSTS.DIRECTION_LEFT || this.movingPixelDirection === CONSTS.DIRECTION_RIGHT) {
      this.direction = this.movingPixelDirection;
    }
  }

  tickMovingPixelProgress() {
    if (this.movingPixelsRemaining === 0) {
      return;
    }
    this.movingPixelsRemaining -= this.travelPixelsPerFrame;
    if (this.movingPixelsRemaining <= 0) {
      this.movingPixelsRemaining = 0;
      this.onDoneMoving();
    }
  }

  onDoneMoving() {
    //Update my x/y!
    const { x, y } = CONSTS.directionUpdateMap[this.movingPixelDirection];
    this.tile.x += x;
    this.tile.y += y;
    this.pos.x = this.tile.x * CONSTS.CELL_SIZE;
    this.pos.y = this.tile.y * CONSTS.CELL_SIZE;
    this.handleCollisions();
    // this.onPostMove();
  }

  // Should be in parent (or Body) to work with eneimes
  handleCollisions() {
    const collision = new Collision(this, this.level);

    this.skin = CONSTS.BODY_SKINS.NORMAL;
    const changesHeroSkin = collision.withChangesHeroSkin();
    if (changesHeroSkin) {
      this.skin = changesHeroSkin.changesHeroSkinOnCollide() ?? this.skin;
    }

    // Adding to inventory
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

    // Purple switches
    if (collision.withDoorSwitch()) {
      this.level.switchAllDoors();
    }

    // Damaging and death
    const takesDamages = collision.withSelfGetsDamaged();
    if (takesDamages) {
      this.takesDamage(takesDamages.type);
    }

    // Finishing the level
    const completesLevel = collision.withCompletesLevel();
    if (completesLevel) {
      this.level.completeLevel();
      soundsManager.playSfx(SFX.WIN);
    }
  }

  takesDamage(deathType: string): void {
    this.level.setDeathOutcome(deathType);
  }

  getYTranslate() {
    // Stand on ground when not moving
    if (this.movingPixelsRemaining === 0 || this.skin !== CONSTS.BODY_SKINS.NORMAL) {
      return 0;
    }

    //Elevate ramp up or down at beginning/end of movement
    const PIXELS_FROM_END = 2;
    if (this.movingPixelsRemaining < PIXELS_FROM_END || this.movingPixelsRemaining > 16 - PIXELS_FROM_END) {
      return -1;
    }

    // Highest in the middle of the movement
    return -2;
  }

  onPreUpdate(engine: Engine): void {
    this.tickMovingPixelProgress();

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

    if (this.movingPixelsRemaining > 0) {
      const x = this.tile.x * CONSTS.CELL_SIZE;
      const y = this.tile.y * CONSTS.CELL_SIZE;
      const progressPixels = CONSTS.CELL_SIZE - this.movingPixelsRemaining;

      switch (this.movingPixelDirection) {
        case CONSTS.DIRECTION_LEFT:
          this.pos.x = x - progressPixels;
          break;
        case CONSTS.DIRECTION_RIGHT:
          this.pos.x = x + progressPixels;
          break;
        case CONSTS.DIRECTION_DOWN:
          this.pos.y = y + progressPixels;
          break;
        case CONSTS.DIRECTION_UP:
          this.pos.y = y - progressPixels;
          break;
      }
    }

    this.graphics.layers
      .get('foreground')
      .use(this.getFrame(), { anchor: vec(0.25, 0.6), offset: vec(0, this.getYTranslate()) });
  }
}
