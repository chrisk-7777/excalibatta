import { Actor, Canvas, Color, Scene, vec } from 'excalibur';

import { CELL_SIZE, THEME_BACKGROUNDS, THEME_TILES_MAP, ThemeTiles } from '../helpers/consts';
import { Clock } from '../services/clock';
import { Game } from './game';
import { GameObject } from '../game-objects/game-object';
import { Inventory } from '../services/inventory';
import { isKeyOfPlacementTypeClassMap, placementTypeClassMap } from '../helpers/placement-map';
import { LevelData } from '../levels/levels-map';
import { Player } from '../game-objects/player';
import { Resources } from './resources';
import { GAME_EVENTS } from '../helpers/events';

export class Level extends Scene {
  private clock!: Clock;
  private data: LevelData;
  private heightWithWalls: number;
  private tiles: ThemeTiles;
  private widthWithWalls: number;

  public inventory: Inventory;
  public deathOutcome: string | null;

  constructor(data: LevelData) {
    super();

    this.data = data;
    this.deathOutcome = null;

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

    this.camera.strategy.lockToActor(this.getPlayer());

    this.clock = new Clock(this.data.timeAvailable, this);
    this.add(this.clock);

    Game.getInstance().emit(GAME_EVENTS.LEVEL_START, {});
  }

  setDeathOutcome(causeOfDeath: string): void {
    this.deathOutcome = causeOfDeath;
    this.engine.clock.stop();
    Game.getInstance().emit(GAME_EVENTS.DEATH, {});
  }

  switchAllDoors(): void {
    this.gameObjects.forEach((gameObject) => {
      if (gameObject.toggleIsRaised) {
        gameObject.toggleIsRaised();
      }
    });
  }

  stealInventory(): void {
    this.gameObjects.forEach((gameObject) => {
      gameObject.resetHasBeenCollected();
      this.inventory.remove(gameObject.type);
    });
  }

  completeLevel(): void {
    this.engine.clock.stop();
    Game.getInstance().emit(GAME_EVENTS.COMPLETE, {});
  }

  isPositionOutOfBounds(x: number, y: number): boolean {
    return x === 0 || y === 0 || x >= this.data.tilesWidth + 1 || y >= this.data.tilesHeight + 1;
  }

  public get gameObjects(): Array<GameObject> {
    return this.actors.filter((actor: Actor): actor is GameObject => {
      return actor instanceof GameObject;
    });
  }

  public getPlayer(): Player {
    const player = this.gameObjects.find((actor): actor is Player => actor instanceof Player);
    if (!player) {
      throw new Error('Player not added to level. Check level config');
    }

    return player;
  }
}
