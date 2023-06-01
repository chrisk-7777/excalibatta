import { Actor, Canvas, Color, Scene, vec } from 'excalibur';

import { CELL_SIZE, THEME_BACKGROUNDS, THEME_TILES_MAP, ThemeTiles } from '../helpers/consts';
import { Clock } from '../services/clock';
import { G } from './global';
import { GameObject } from '../game-objects/game-object';
import { Inventory } from '../services/inventory';
import { isKeyOfPlacementTypeClassMap, placementTypeClassMap } from '../helpers/placement-map';
import { Player } from '../game-objects/player';
import { Resources } from './resources';
import Levels from '../levels/levels-map';

export class Level extends Scene {
  clock: Clock;
  currentLevelId: keyof typeof Levels;
  deathOutcome: string | null;
  heightWithWalls: number;
  inventory: Inventory;
  isCompleted: boolean;
  level: (typeof Levels)[keyof typeof Levels];
  tiles: ThemeTiles;
  widthWithWalls: number;

  constructor() {
    super();

    this.currentLevelId = 'DemoLevel2';
    this.level = Levels[this.currentLevelId];
    this.deathOutcome = null;
    this.isCompleted = false;

    this.widthWithWalls = this.level.tilesWidth + 1;
    this.heightWithWalls = this.level.tilesHeight + 1;
    this.tiles = THEME_TILES_MAP[this.level.theme];

    this.inventory = new Inventory();
    this.clock = new Clock(77 /* from level config */, this);
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

  onInitialize(): void {
    const actorInstnace = new Actor({ pos: vec(0, 0), anchor: vec(0, 0) });

    const canvas = new Canvas({
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
              Resources.TileSet.image,
              tileX * CELL_SIZE,
              tileY * CELL_SIZE,
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

    actorInstnace.graphics.use(canvas);
    this.add(actorInstnace);

    this.level.placements.forEach((gameObject) => {
      const { type, x, y } = gameObject;
      if (isKeyOfPlacementTypeClassMap(type)) {
        const instance = new placementTypeClassMap[type](vec(x, y), this, type);
        this.add(instance);
      }
    });

    this.engine.backgroundColor = Color.fromHex(THEME_BACKGROUNDS[this.level.theme]);

    const player = this.actors.find((p) => p instanceof Player);
    // this.camera.addStrategy(new LerpStrategy(player!));
    this.camera.strategy.lockToActor(player!);

    // Funky smell - triggering event for ui to update... can be better?
    this.inventory.clear();
  }

  setDeathOutcome(causeOfDeath: string) {
    this.deathOutcome = causeOfDeath;
    this.engine.clock.stop();
    G.emit('Death', {});
  }

  switchAllDoors() {
    this.actors.forEach((actor) => {
      if (actor instanceof GameObject && actor.toggleIsRaised) {
        actor.toggleIsRaised();
      }
    });
  }

  completeLevel() {
    this.isCompleted = true;
    this.engine.clock.stop();
    G.emit('Complete', {});
  }

  onPostUpdate(): void {
    this.clock.tick();
  }

  isPositionOutOfBounds(x: number, y: number) {
    return x === 0 || y === 0 || x >= this.level.tilesWidth + 1 || y >= this.level.tilesHeight + 1;
  }
}
