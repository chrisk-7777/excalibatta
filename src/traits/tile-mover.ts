import { GameObject } from '../game-objects/game-object';
import {
  CELL_SIZE,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  FourDirections,
  directionUpdateMap,
} from '../helpers/consts';

export class TileMover {
  gameObject: GameObject;
  movingPixelsRemaining: number;
  travelPixelsPerFrame: number;
  movingPixelDirection: FourDirections;

  constructor(gameObject: GameObject) {
    this.gameObject = gameObject;
    this.movingPixelsRemaining = 0;
    this.travelPixelsPerFrame = 1.5;
    this.movingPixelDirection = DIRECTION_RIGHT;
  }

  tick() {
    if (this.movingPixelsRemaining === 0) {
      return;
    }
    this.movingPixelsRemaining -= this.travelPixelsPerFrame;
    if (this.movingPixelsRemaining <= 0) {
      this.movingPixelsRemaining = 0;
      this.onDoneMoving();
    }
  }

  update() {
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

  reset(direction: FourDirections) {
    this.movingPixelsRemaining = CELL_SIZE;
    this.movingPixelDirection = direction;
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
