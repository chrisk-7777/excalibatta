import { Actor, CollisionType, Engine, Vector, vec } from 'excalibur';

import { Level } from '../services/level';
import { CELL_SIZE, FourDirections, directionUpdateMap } from '../helpers/consts';
import { Collision } from '../services/collision';

interface Options {
  anchor: Vector;
  height: number;
  level: Level;
  pos: Vector;
  type: string;
  width: number;
}

export abstract class GameObject extends Actor {
  canBeStolen: boolean;
  canCollectItems: boolean;
  level: Level;
  type: string;
  zOffset: number;

  constructor(options: Options) {
    super({
      pos: options.pos,
      width: options.width,
      height: options.height,
      anchor: options.anchor,
      collisionType: CollisionType.Passive,
    });
    this.canBeStolen = false;
    this.canCollectItems = false;
    this.level = options.level;
    this.type = options.type;
    this.zOffset = 1;
  }

  isSolidForBody() {
    return false;
  }

  addsItemToInventoryOnCollide(): string | null {
    return null;
  }

  completesLevelOnCollide(): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  damagesBodyOnCollide(_body: GameObject): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  takesDamage(_body: string): void {
    return;
  }

  collect() {
    const item = this.addsItemToInventoryOnCollide();
    if (item) {
      this.active = false;
      this.level.inventory.add(item);
    }
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

    if (isOutOfBounds) {
      return true;
    }

    return Boolean(collision.withSolidPlacement());
  }

  update(engine: Engine, delta: number): void {
    super.update(engine, delta);

    this.z = this.pos.y + this.zOffset;
  }
}
