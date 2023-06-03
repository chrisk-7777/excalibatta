import { GameObject } from '../game-objects/game-object';
import {
  BODY_SKINS,
  CELL_SIZE,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  FourDirections,
  directionUpdateMap,
  heroSkinMap,
} from '../helpers/consts';
import { Collision } from '../services/collision';
import soundsManager, { SFX } from '../services/sounds';

type ControllableGameObject = GameObject;

export class TileMover {
  gameObject: ControllableGameObject;
  movingPixelsRemaining: number;
  travelPixelsPerFrame: number;
  movingPixelDirection: FourDirections;

  constructor(gameObject: ControllableGameObject) {
    this.gameObject = gameObject;
    this.movingPixelsRemaining = 0;
    this.travelPixelsPerFrame = 1.511111;
    this.movingPixelDirection = DIRECTION_RIGHT;
  }

  earlyUpdate() {
    if (this.movingPixelsRemaining === 0) {
      return;
    }
    this.movingPixelsRemaining -= this.travelPixelsPerFrame;
    if (this.movingPixelsRemaining <= 0) {
      this.movingPixelsRemaining = 0;
      this.onDoneMoving();
    }
  }

  lateUpdate() {
    if (this.movingPixelsRemaining > 0) {
      const x = this.gameObject.tile.x * CELL_SIZE;
      const y = this.gameObject.tile.y * CELL_SIZE;
      const progressPixels = CELL_SIZE - this.movingPixelsRemaining;

      switch (this.movingPixelDirection) {
        case DIRECTION_LEFT:
          this.gameObject.pos.x = x - progressPixels;
          break;
        case DIRECTION_RIGHT:
          this.gameObject.pos.x = x + progressPixels;
          break;
        case DIRECTION_DOWN:
          this.gameObject.pos.y = y + progressPixels;
          break;
        case DIRECTION_UP:
          this.gameObject.pos.y = y - progressPixels;
          break;
      }
    }
  }

  handleCollisions() {
    const collision = new Collision(this.gameObject, this.gameObject.level);

    this.gameObject.skin = BODY_SKINS.NORMAL;
    const changesHeroSkin = collision.withChangesHeroSkin();
    if (changesHeroSkin) {
      const nextSkin = changesHeroSkin.changesHeroSkinOnCollide() ?? '';
      if (typeof nextSkin === 'string' && Object.keys(heroSkinMap).includes(nextSkin)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore need custom guard
        this.gameObject.skin = nextSkin;
      }
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

    // Auto moving (Conveyors, Ice, etc)
    const autoMovePlacement = collision.withPlacementMovesBody();
    if (autoMovePlacement) {
      const direction = autoMovePlacement.autoMovesBodyOnCollide(this.gameObject);
      if (direction !== false) {
        this.gameObject.onAutoMovement(direction);
      }
    }

    // Purple switches
    if (collision.withDoorSwitch()) {
      this.gameObject.level.switchAllDoors();
    }

    // Teleports
    const teleport = collision.withTeleport();
    if (teleport) {
      const pos = teleport.teleportsToPositionOnCollide(this.gameObject);
      if (pos) {
        this.gameObject.tile.x = pos.x;
        this.gameObject.tile.y = pos.y;
        this.gameObject.pos.x = this.gameObject.tile.x * CELL_SIZE;
        this.gameObject.pos.y = this.gameObject.tile.y * CELL_SIZE;
        soundsManager.playSfx(SFX.TELEPORT);
      }
    }

    // Damaging and death
    const takesDamages = collision.withSelfGetsDamaged();
    if (takesDamages) {
      this.gameObject.takesDamage(takesDamages.type);
    }

    // Finishing the level
    const completesLevel = collision.withCompletesLevel();
    if (completesLevel) {
      this.gameObject.level.completeLevel();
      soundsManager.playSfx(SFX.WIN);
    }
  }

  reset(direction: FourDirections) {
    this.movingPixelsRemaining = CELL_SIZE;
    this.movingPixelDirection = direction;
    this.onStartMoving();
  }

  isMoving(): boolean {
    return this.movingPixelsRemaining > 0;
  }

  onStartMoving() {
    this.gameObject.onStartMoving();
  }

  onDoneMoving() {
    //Update my x/y!
    const { x, y } = directionUpdateMap[this.movingPixelDirection];
    this.gameObject.tile.x += x;
    this.gameObject.tile.y += y;
    this.gameObject.pos.x = this.gameObject.tile.x * CELL_SIZE;
    this.gameObject.pos.y = this.gameObject.tile.y * CELL_SIZE;
    this.gameObject.handleCollisions();
    // this.onPostMove();
  }
}
