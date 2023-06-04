import { Actor, CollisionType, Engine, Sprite, SpriteSheet, Vector, vec } from 'excalibur';

import { Level } from '../services/level';
import { CELL_SIZE, FourDirections, Skin, directionUpdateMap } from '../helpers/consts';
import { Collision } from '../services/collision';
import { Tile } from '../helpers/tiles';
import { Resources, TileSetGrid16 } from '../services/resources';

export abstract class GameObject extends Actor {
  canBeStolen: boolean;
  canCompleteLevel: boolean;
  canCollectItems: boolean;
  isRaised: boolean;
  interactsWithGround: boolean;
  turnsAroundAtWater: boolean;
  level: Level;
  type: string;
  zOffset: number;
  tile: Vector;
  skin: Skin | null;

  constructor(pos: Vector, level: Level, type: string) {
    super({
      pos: pos.clone().scale(CELL_SIZE),
      width: CELL_SIZE,
      height: CELL_SIZE,
      anchor: Vector.Zero,
      collisionType: CollisionType.Passive,
    });
    this.level = level;
    this.type = type;
    this.canBeStolen = false;
    this.canCompleteLevel = false;
    this.canCollectItems = false;
    this.isRaised = false;
    this.interactsWithGround = false;
    this.turnsAroundAtWater = false;
    this.zOffset = 1;
    this.tile = pos.clone();
    this.skin = null;
  }

  generateGraphic(tile: Tile): Sprite {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.TileSetExtruded,
      grid: TileSetGrid16,
      spacing: {
        margin: {
          x: 2,
          y: 2,
        },
        originOffset: {
          x: 1,
          y: 1,
        },
      },
    });

    const sprite = spriteSheet.getSprite(tile[0], tile[1]);

    if (!sprite) {
      throw new Error('Sprite graphic misconfigured');
    }

    return sprite;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isSolidForBody(_body: GameObject): boolean {
    return false;
  }

  addsItemToInventoryOnCollide(): string | null {
    return null;
  }

  completesLevelOnCollide(): boolean {
    return false;
  }

  changesHeroSkinOnCollide(): Skin | null {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stealsInventoryOnCollide(_body: GameObject): boolean {
    return false;
  }

  canBeUnlocked(): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autoMovesBodyOnCollide(_body: GameObject): false | FourDirections {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAutoMovement(_direction: FourDirections): void {
    return;
  }

  toggleIsRaised(): void {
    return;
  }

  handleCollisions(): void {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startMoving(_direction: FourDirections): void {
    return;
  }

  onStartMoving(): void {
    return;
  }

  isMoving(): boolean {
    return false;
  }

  onPostMove(): void {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  switchesDoorsOnCollide(_body: GameObject): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  damagesBodyOnCollide(_body: GameObject): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  teleportsToPositionOnCollide(_body: GameObject): false | { x: number; y: number } {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  takesDamage(_body: string): void {
    return;
  }

  collect() {
    const item = this.addsItemToInventoryOnCollide();
    if (item) {
      this.graphics.visible = false;
      this.level.inventory.add(item);
    }
  }

  resetHasBeenCollected() {
    if (this.canBeStolen && !this.graphics.visible) {
      this.graphics.visible = true;
    }
  }

  getCollisionAtNextPosition(direction: FourDirections) {
    const { x, y } = directionUpdateMap[direction];
    const nextX = this.tile.x + x;
    const nextY = this.tile.y + y;
    return new Collision(this, this.level, vec(nextX, nextY));
  }

  getLockAtNextPosition(direction: FourDirections) {
    const collision = this.getCollisionAtNextPosition(direction);
    return collision.withLock();
  }

  isSolidAtNextPosition(direction: FourDirections) {
    // Check for ice corner...
    const onIceCorner = new Collision(this, this.level).withIceCorner();
    if (onIceCorner) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore need to fix up duck types
      if (onIceCorner.blocksMovementDirection(direction)) {
        return true;
      }
    }

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
