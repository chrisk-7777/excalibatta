import { Actor, Canvas, Color, Scene, vec } from 'excalibur';

import { CELL_SIZE, THEME_BACKGROUNDS, THEME_TILES_MAP, ThemeTiles } from '../helpers/consts';
import { Clock } from '../services/clock';
import { game } from './game';
import { GameObject } from '../game-objects/game-object';
import { Inventory } from '../services/inventory';
import { isKeyOfPlacementTypeClassMap, placementTypeClassMap } from '../helpers/placement-map';
import { LevelData } from '../levels/levels-map';
import { Player } from '../game-objects/player';
import { Resources } from './resources';

export class Level extends Scene {
  clock!: Clock;
  deathOutcome: string | null;
  heightWithWalls: number;
  inventory: Inventory;
  isCompleted: boolean;
  data: LevelData;
  player: Player | undefined;
  tiles: ThemeTiles;
  widthWithWalls: number;

  constructor(data: LevelData) {
    super();

    this.data = data;
    this.deathOutcome = null;
    this.isCompleted = false;

    this.widthWithWalls = this.data.tilesWidth + 1;
    this.heightWithWalls = this.data.tilesHeight + 1;
    this.tiles = THEME_TILES_MAP[this.data.theme];

    this.inventory = new Inventory();
  }

  getBackgroundTile(x: number, y: number) {
    if (x === 0) {
      return this.tiles.LEFT;
    }
    if (x === this.widthWithWalls) {
      return this.tiles.RIGHT;
    }
    if (y === 0) {
      return this.tiles.TOP;
    }
    if (y === this.heightWithWalls) {
      return this.tiles.BOTTOM;
    }
    return this.tiles.FLOOR;
  }

  generateBackground(): Actor {
    const background = new Canvas({
      width: (this.widthWithWalls + 1) * CELL_SIZE,
      height: (this.heightWithWalls + 1) * CELL_SIZE,
      cache: true,
      draw: (ctx) => {
        for (let y = 0; y <= this.heightWithWalls; y++) {
          for (let x = 0; x <= this.widthWithWalls; x++) {
            // Skip Bottom Left and Bottom Right for intentional blank tiles in those corners
            if (y === this.heightWithWalls && (x === 0 || x === this.widthWithWalls)) {
              continue;
            }

            const [tileX, tileY] = this.getBackgroundTile(x, y);
            ctx.drawImage(
              Resources.TileSetExtruded.image,
              // 2 = spacing between extrdued tiles
              // 1 = margin of extrdued tiles to image frame
              tileX * CELL_SIZE + 2 * tileX + 1,
              tileY * CELL_SIZE + 2 * tileY + 1,
              CELL_SIZE,
              CELL_SIZE,
              x * CELL_SIZE,
              y * CELL_SIZE,
              CELL_SIZE,
              CELL_SIZE
            );
          }
        }
      },
    });

    const backgroundInstance = new Actor({ pos: vec(0, 0), anchor: vec(0, 0) });
    backgroundInstance.graphics.use(background);

    return backgroundInstance;
  }

  placeGameObjects(): void {
    this.data.placements.forEach((gameObject) => {
      const { type, x, y, ...data } = gameObject;
      if (isKeyOfPlacementTypeClassMap(type)) {
        this.add(new placementTypeClassMap[type](vec(x, y), this, type, data));
      }
    });
  }

  onInitialize(): void {
    this.add(this.generateBackground());
    this.engine.backgroundColor = Color.fromHex(THEME_BACKGROUNDS[this.data.theme]);

    this.placeGameObjects();

    // TODO TS typeguard function
    this.player = this.actors.find((p) => p instanceof Player) as Player;
    // this.camera.addStrategy(new LerpStrategy(player!));
    this.camera.strategy.lockToActor(this.player);

    // TODO Funky smell - triggering event for ui to update... can be better?
    this.inventory.clear();

    this.clock = new Clock(this.data.timeAvailable, this);
    this.add(this.clock);
  }

  setDeathOutcome(causeOfDeath: string) {
    this.deathOutcome = causeOfDeath;
    this.engine.clock.stop();
    game.emit('Death', {});
  }

  switchAllDoors() {
    this.actors.forEach((actor) => {
      if (actor instanceof GameObject && actor.toggleIsRaised) {
        actor.toggleIsRaised();
      }
    });
  }

  stealInventory() {
    this.actors.forEach((actor) => {
      if (actor instanceof GameObject) {
        actor.resetHasBeenCollected();
      }
    });

    // TODO this is risky - it assumes anything shown in the inventory can be stolen and vice versa
    // It should only clear those in the above loop, or better listen to an event simialr to adding
    this.inventory.clear();
  }

  completeLevel() {
    this.isCompleted = true;
    this.engine.clock.stop();
    game.emit('Complete', {});
  }

  isPositionOutOfBounds(x: number, y: number) {
    return x === 0 || y === 0 || x >= this.data.tilesWidth + 1 || y >= this.data.tilesHeight + 1;
  }
}
