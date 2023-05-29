import { Actor, CollisionType, Vector, vec } from 'excalibur';

import { Level } from '../services/level';
import { CELL_SIZE, FourDirections, directionUpdateMap } from '../helpers/consts';
import { Collision } from '../services/collision';

interface Options {
  anchor: Vector;
  height: number;
  level: Level;
  pos: Vector;
  width: number;
}

export abstract class GameObject extends Actor {
  canCollectItems: boolean = false;
  level: Level;

  constructor(options: Options) {
    super({
      pos: options.pos,
      width: options.width,
      height: options.height,
      anchor: options.anchor,
      collisionType: CollisionType.Passive,
    });
    this.level = options.level;
  }

  isSolidForBody() {
    return false;
  }

  addsItemToInventoryOnCollide() {
    return null;
  }

  collect() {
    return;
  }

  getCollisionAtNextPosition(direction: FourDirections) {
    const { x, y } = directionUpdateMap[direction];
    const nextX = this.pos.x / CELL_SIZE + x;
    const nextY = this.pos.y / CELL_SIZE + y;
    return new Collision(this, this.level, vec(nextX, nextY));
  }

  isSolidAtNextPosition(direction: FourDirections) {
    // Check for ice corner...
    // const onIceCorner = new Collision(this, this.level).withIceCorner();
    // if (onIceCorner?.blocksMovementDirection(direction)) {
    //   return true;
    // }

    const collision = this.getCollisionAtNextPosition(direction);
    const isOutOfBounds = this.level.isPositionOutOfBounds(collision.x, collision.y);

    console.log(isOutOfBounds);

    if (isOutOfBounds) {
      return true;
    }

    return Boolean(collision.withSolidPlacement());
  }
}
