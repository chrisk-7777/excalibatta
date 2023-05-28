import { Actor, CollisionType, Sprite, SpriteSheet, Vector, vec } from 'excalibur';
import { Resources, TileSetGrid16 } from '../services/resources';
import { TILES } from '../helpers/tiles';
import { PLACEMENT_TYPE_KEY_BLUE } from '../helpers/consts';
import { Level } from '../services/level';

export class BlueKeyPickup extends Actor {
  level: Level;

  constructor(pos: Vector, level: Level) {
    super({
      pos,
      width: 16,
      height: 16,
      anchor: vec(0, 0),
      collisionType: CollisionType.Passive,
    });
    this.level = level;
  }

  onInitialize(): void {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.TileSet,
      grid: TileSetGrid16,
    });

    this.graphics.use(spriteSheet.getSprite(TILES.BLUE_KEY[0], TILES.BLUE_KEY[1]) as Sprite);
  }

  addsItemToInventoryOnCollide() {
    return PLACEMENT_TYPE_KEY_BLUE;
  }

  collect() {
    this.active = false;
    this.level.inventory.add(this.addsItemToInventoryOnCollide());
  }
}
