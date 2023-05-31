import { Actor, Camera, CameraStrategy, Canvas, Engine, Scene, Vector, vec } from 'excalibur';

import { BlueKeyPickup } from '../game-objects/blue-key-pickup';
import { CELL_SIZE, THEME_TILES_MAP } from '../helpers/consts';
import { Clock } from '../services/clock';
import { Door } from '../game-objects/door';
import { DoorSwitch } from '../game-objects/door-switch';
import { FirePickup } from '../game-objects/fire-pickup';
import { FireTile } from '../game-objects/fire-tile';
import { Flour } from '../game-objects/flour';
import { G } from './global';
import { GameObject } from '../game-objects/game-object';
import { Goal } from '../game-objects/goal';
import { GreenKeyPickup } from '../game-objects/green-key-pickup';
import { IcePickup } from '../game-objects/ice-pickup';
import { Inventory } from '../services/inventory';
import { Player } from '../game-objects/player';
import { Resources } from './resources';
import { Wall } from '../game-objects/wall';
import { WaterPickup } from '../game-objects/water-pickup';
import { WaterTile } from '../game-objects/water-tile';
import * as CONSTS from '../helpers/consts';
import Levels from '../levels/levels-map';

const placementTypeClassMap = {
  [CONSTS.PLACEMENT_TYPE_HERO]: Player,
  [CONSTS.PLACEMENT_TYPE_GOAL]: Goal,
  [CONSTS.PLACEMENT_TYPE_WALL]: Wall,
  [CONSTS.PLACEMENT_TYPE_FLOUR]: Flour,
  // [CONSTS.PLACEMENT_TYPE_CELEBRATION]: Celebration,
  // [CONSTS.PLACEMENT_TYPE_LOCK]: Lock,
  [CONSTS.PLACEMENT_TYPE_KEY_GREEN]: GreenKeyPickup,
  [CONSTS.PLACEMENT_TYPE_KEY_BLUE]: BlueKeyPickup,
  [CONSTS.PLACEMENT_TYPE_WATER]: WaterTile,
  [CONSTS.PLACEMENT_TYPE_WATER_PICKUP]: WaterPickup,
  // [CONSTS.PLACEMENT_TYPE_GROUND_ENEMY]: GroundEnemy,
  // [CONSTS.PLACEMENT_TYPE_FLYING_ENEMY]: FlyingEnemy,
  // [CONSTS.PLACEMENT_TYPE_ROAMING_ENEMY]: RoamingEnemy,
  // [CONSTS.PLACEMENT_TYPE_CONVEYOR]: Conveyor,
  // [CONSTS.PLACEMENT_TYPE_ICE]: Ice,
  [CONSTS.PLACEMENT_TYPE_ICE_PICKUP]: IcePickup,
  [CONSTS.PLACEMENT_TYPE_FIRE]: FireTile,
  [CONSTS.PLACEMENT_TYPE_FIRE_PICKUP]: FirePickup,
  [CONSTS.PLACEMENT_TYPE_SWITCH_DOOR]: Door,
  [CONSTS.PLACEMENT_TYPE_SWITCH]: DoorSwitch,
  // [CONSTS.PLACEMENT_TYPE_TELEPORT]: Teleport,
  // [CONSTS.PLACEMENT_TYPE_THIEF]: Thief,
  // [CONSTS.PLACEMENT_TYPE_CIABATTA]: Ciabatta,
};

const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t;
};

export class LerpStrategy implements CameraStrategy<Actor> {
  constructor(public target: Actor) {}
  public action = (target: Actor, cam: Camera, _eng: Engine, _delta: number) => {
    const center = target.center;
    const currentFocus = cam.getFocus();

    const nextX = Math.round(lerp(currentFocus.x, center.x, 0.1));
    const nextY = Math.round(lerp(currentFocus.y, center.y, 0.1));

    return new Vector(nextX, nextY);
  };
}

export class Level extends Scene {
  clock: Clock;
  currentLevelId: keyof typeof Levels;
  deathOutcome: string | null;
  heightWithWalls: number;
  inventory: Inventory;
  level: (typeof Levels)[keyof typeof Levels];
  tiles: (typeof THEME_TILES_MAP)[0];
  widthWithWalls: number;
  isCompleted: boolean;

  constructor() {
    super();

    this.currentLevelId = 'DemoLevel1';
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

  isKeyOfPlacementTypeClassMap(key: string): key is keyof typeof placementTypeClassMap {
    return key in placementTypeClassMap;
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
      if (this.isKeyOfPlacementTypeClassMap(type)) {
        const instance = new placementTypeClassMap[type](vec(x, y), this, type);
        this.add(instance);
      }
    });

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
