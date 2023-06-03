import { BlueKeyPickup } from '../game-objects/blue-key-pickup';
import { BlueLock } from '../game-objects/blue-lock';
import { Celebration } from '../game-objects/celebration';
import { Door } from '../game-objects/door';
import { DoorSwitch } from '../game-objects/door-switch';
import { FirePickup } from '../game-objects/fire-pickup';
import { FireTile } from '../game-objects/fire-tile';
import { Flour } from '../game-objects/flour';
import { FlyingEnemy } from '../game-objects/flying-enemy';
import { Goal } from '../game-objects/goal';
import { GreenKeyPickup } from '../game-objects/green-key-pickup';
import { GreenLock } from '../game-objects/green-lock';
import { GroundEnemy } from '../game-objects/ground-enemy';
import { IcePickup } from '../game-objects/ice-pickup';
import { IceTile } from '../game-objects/ice-tile';
import { Player } from '../game-objects/player';
import { RoamingEnemy } from '../game-objects/roaming-enemy';
import { Teleport } from '../game-objects/teleport';
import { Thief } from '../game-objects/thief';
import { Wall } from '../game-objects/wall';
import { WaterPickup } from '../game-objects/water-pickup';
import { WaterTile } from '../game-objects/water-tile';
import {
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_WALL,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_KEY_GREEN,
  PLACEMENT_TYPE_KEY_BLUE,
  PLACEMENT_TYPE_WATER,
  PLACEMENT_TYPE_WATER_PICKUP,
  PLACEMENT_TYPE_ICE_PICKUP,
  PLACEMENT_TYPE_FIRE,
  PLACEMENT_TYPE_FIRE_PICKUP,
  PLACEMENT_TYPE_SWITCH_DOOR,
  PLACEMENT_TYPE_SWITCH,
  PLACEMENT_TYPE_GROUND_ENEMY,
  PLACEMENT_TYPE_ICE,
  PLACEMENT_TYPE_LOCK_GREEN,
  PLACEMENT_TYPE_LOCK_BLUE,
  PLACEMENT_TYPE_TELEPORT,
  PLACEMENT_TYPE_CELEBRATION,
  PLACEMENT_TYPE_FLYING_ENEMY,
  PLACEMENT_TYPE_ROAMING_ENEMY,
  PLACEMENT_TYPE_THIEF,
} from './consts';

export const placementTypeClassMap = {
  [PLACEMENT_TYPE_HERO]: Player,
  [PLACEMENT_TYPE_GOAL]: Goal,
  [PLACEMENT_TYPE_WALL]: Wall,
  [PLACEMENT_TYPE_FLOUR]: Flour,
  [PLACEMENT_TYPE_CELEBRATION]: Celebration,
  [PLACEMENT_TYPE_LOCK_GREEN]: GreenLock,
  [PLACEMENT_TYPE_LOCK_BLUE]: BlueLock,
  [PLACEMENT_TYPE_KEY_GREEN]: GreenKeyPickup,
  [PLACEMENT_TYPE_KEY_BLUE]: BlueKeyPickup,
  [PLACEMENT_TYPE_WATER]: WaterTile,
  [PLACEMENT_TYPE_WATER_PICKUP]: WaterPickup,
  [PLACEMENT_TYPE_GROUND_ENEMY]: GroundEnemy,
  [PLACEMENT_TYPE_FLYING_ENEMY]: FlyingEnemy,
  [PLACEMENT_TYPE_ROAMING_ENEMY]: RoamingEnemy,
  // [PLACEMENT_TYPE_CONVEYOR]: Conveyor,
  [PLACEMENT_TYPE_ICE]: IceTile,
  [PLACEMENT_TYPE_ICE_PICKUP]: IcePickup,
  [PLACEMENT_TYPE_FIRE]: FireTile,
  [PLACEMENT_TYPE_FIRE_PICKUP]: FirePickup,
  [PLACEMENT_TYPE_SWITCH_DOOR]: Door,
  [PLACEMENT_TYPE_SWITCH]: DoorSwitch,
  [PLACEMENT_TYPE_TELEPORT]: Teleport,
  [PLACEMENT_TYPE_THIEF]: Thief,
  // [PLACEMENT_TYPE_CIABATTA]: Ciabatta,
} as const;

// Typeguard
export function isKeyOfPlacementTypeClassMap(key: string): key is keyof typeof placementTypeClassMap {
  return key in placementTypeClassMap;
}
