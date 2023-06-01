import { Actor, CollisionType, Engine, Sprite, SpriteSheet, Vector, vec } from 'excalibur';

import { Level } from '../services/level';
import { CELL_SIZE, FourDirections, directionUpdateMap } from '../helpers/consts';
import { Collision } from '../services/collision';
import { TILES, Tile } from '../helpers/tiles';
import { Resources, TileSetGrid16, TileSetGrid32 } from '../services/resources';
import { heroSkinMap } from './player';

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
  canCompleteLevel: boolean;
  canCollectItems: boolean;
  isRaised: boolean;
  interactsWithGround: boolean;
  turnsAroundAtWater: boolean;
  level: Level;
  type: string;
  zOffset: number;
  tile: Vector;

  constructor(options: Options) {
    super({
      pos: options.pos.clone().scale(CELL_SIZE),
      width: options.width,
      height: options.height,
      anchor: options.anchor,
      collisionType: CollisionType.Passive,
    });
    this.canBeStolen = false;
    this.canCompleteLevel = false;
    this.canCollectItems = false;
    this.isRaised = false;
    this.interactsWithGround = false;
    this.turnsAroundAtWater = false;
    this.level = options.level;
    this.type = options.type;
    this.zOffset = 1;
    this.tile = options.pos.clone();
  }

  generateGraphic(tile: Tile, grid: typeof TileSetGrid16 | typeof TileSetGrid32): Sprite {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.TileSet,
      grid,
    });

    // grid.spriteWidth / CELL_SIZE:
    // - Divivdes the sprite by 1 when TileSetGrid16
    // - Divivdes the sprite by 2 when TileSetGrid32
    const sprite = spriteSheet.getSprite(
      tile[0] / (grid.spriteWidth / CELL_SIZE),
      tile[1] / (grid.spriteWidth / CELL_SIZE)
    );

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

  changesHeroSkinOnCollide(): keyof typeof heroSkinMap | null {
    return null;
  }

  toggleIsRaised(): void {
    return;
  }

  handleCollisions(): void {
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
    const nextX = this.tile.x + x;
    const nextY = this.tile.y + y;
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
