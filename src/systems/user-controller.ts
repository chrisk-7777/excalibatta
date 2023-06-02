import { Engine, Input } from 'excalibur';
import { GameObject } from '../game-objects/game-object';
import { DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, FourDirections } from '../helpers/consts';

export class UserController {
  gameObject: GameObject;

  constructor(gameObject: GameObject) {
    this.gameObject = gameObject;
  }

  requestMovement(direction: FourDirections) {
    //Attempt to start moving
    if (this.gameObject.isMoving()) {
      return;
    }

    // Check for lock at next position
    // const possibleLock = this.getLockAtNextPosition(direction);
    // if (possibleLock) {
    //   possibleLock.unlock();
    //   return;
    // }

    //Make sure the next space is available
    if (this.gameObject.isSolidAtNextPosition(direction)) {
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
    this.gameObject.startMoving(direction);
  }

  update(engine: Engine) {
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
  }
}
