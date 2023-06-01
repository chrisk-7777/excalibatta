import { Animation, Engine, Input, Sprite, SpriteSheet, Vector, vec } from 'excalibur';

import { Collision } from '../services/collision';
import { GameObject } from './game-object';
import { Level } from '../services/level';
import { Resources, TileSetGrid16, TileSetGrid32 } from '../services/resources';
import { TILES } from '../helpers/tiles';
import soundsManager, { SFX } from '../services/sounds';
import {
  BODY_SKINS,
  HERO_RUN_1,
  HERO_RUN_2,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  FourDirections,
  CELL_SIZE,
  DIRECTION_UP,
  DIRECTION_DOWN,
} from '../helpers/consts';
import { TileMover } from '../traits/tile-mover';

export const heroSkinMap = {
  [BODY_SKINS.NORMAL]: [TILES.HERO_LEFT, TILES.HERO_RIGHT],
  [BODY_SKINS.WATER]: [TILES.HERO_WATER_LEFT, TILES.HERO_WATER_RIGHT],
  [BODY_SKINS.FIRE]: [TILES.HERO_FIRE_LEFT, TILES.HERO_FIRE_RIGHT],
  [BODY_SKINS.DEATH]: [TILES.HERO_DEATH_LEFT, TILES.HERO_DEATH_RIGHT],
  [BODY_SKINS.SCARED]: [TILES.HERO_DEATH_LEFT, TILES.HERO_DEATH_RIGHT],
  [BODY_SKINS.ICE]: [TILES.HERO_ICE_LEFT, TILES.HERO_ICE_RIGHT],
  [BODY_SKINS.CONVEYOR]: [TILES.HERO_CONVEYOR_LEFT, TILES.HERO_CONVEYOR_RIGHT],
  [BODY_SKINS.TELEPORT]: [TILES.HERO_TELEPORT_LEFT, TILES.HERO_TELEPORT_RIGHT],
  [HERO_RUN_1]: [TILES.HERO_RUN_1_LEFT, TILES.HERO_RUN_1_RIGHT],
  [HERO_RUN_2]: [TILES.HERO_RUN_2_LEFT, TILES.HERO_RUN_2_RIGHT],
} as const;

export class Player extends GameObject {
  canCollectItems: boolean;
  canCompleteLevel: boolean;
  direction: typeof DIRECTION_LEFT | typeof DIRECTION_RIGHT;
  isDead: boolean;
  skin: keyof typeof heroSkinMap;
  spriteWalkFrame: 0 | 1;
  mover: TileMover;

  constructor(pos: Vector, level: Level, type: string) {
    super({
      pos,
      width: CELL_SIZE,
      height: CELL_SIZE,
      anchor: Vector.Zero,
      level,
      type,
    });

    this.zOffset = 10;
    this.canCollectItems = true;
    this.canCompleteLevel = true;
    this.direction = DIRECTION_RIGHT;
    this.interactsWithGround = true;
    this.isDead = false;
    this.skin = BODY_SKINS.NORMAL;
    this.spriteWalkFrame = 0;
    this.canCompleteLevel = true;

    this.mover = new TileMover(this);
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
    const index = this.direction === DIRECTION_LEFT ? 0 : 1;

    // If dead, show the dead skin
    if (this.level.deathOutcome) {
      return `${BODY_SKINS.DEATH}-${index}`;
    }

    //Use correct walking frame per direction
    if (this.mover.movingPixelsRemaining > 0 && this.skin === BODY_SKINS.NORMAL) {
      const walkKey = this.spriteWalkFrame === 0 ? HERO_RUN_1 : HERO_RUN_2;
      return `${walkKey}-${index}`;
    }

    return `${this.skin}-${index}`;
  }

  requestMovement(direction: FourDirections) {
    //Attempt to start moving
    if (this.mover.movingPixelsRemaining > 0) {
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
    this.mover.reset(direction);
    this.updateFacingDirection();
    this.updateWalkFrame();
  }

  updateFacingDirection() {
    if (this.mover.movingPixelDirection === DIRECTION_LEFT || this.mover.movingPixelDirection === DIRECTION_RIGHT) {
      this.direction = this.mover.movingPixelDirection;
    }
  }

  // Should be in parent (or Body) to work with eneimes
  handleCollisions() {
    const collision = new Collision(this, this.level);

    this.skin = BODY_SKINS.NORMAL;
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
    if (this.mover.movingPixelsRemaining === 0 || this.skin !== BODY_SKINS.NORMAL) {
      return 0;
    }

    //Elevate ramp up or down at beginning/end of movement
    const PIXELS_FROM_END = 2;
    if (this.mover.movingPixelsRemaining < PIXELS_FROM_END || this.mover.movingPixelsRemaining > 16 - PIXELS_FROM_END) {
      return -1;
    }

    // Highest in the middle of the movement
    return -2;
  }

  onPreUpdate(engine: Engine): void {
    this.mover.tick();

    if (engine.input.keyboard.isHeld(Input.Keys.ArrowLeft)) {
      this.requestMovement(DIRECTION_LEFT);
    }
    if (engine.input.keyboard.isHeld(Input.Keys.ArrowRight)) {
      this.requestMovement(DIRECTION_RIGHT);
    }
    if (engine.input.keyboard.isHeld(Input.Keys.ArrowUp)) {
      this.requestMovement(DIRECTION_UP);
    }
    if (engine.input.keyboard.isHeld(Input.Keys.ArrowDown)) {
      this.requestMovement(DIRECTION_DOWN);
    }

    this.mover.update();
  }

  onPostUpdate(): void {
    this.graphics.layers
      .get('foreground')
      .use(this.getFrame(), { anchor: vec(0.25, 0.6), offset: vec(0, this.getYTranslate()) });
  }
}
