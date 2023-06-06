import { TILES } from './tiles';

export const CELL_SIZE = 16;
export const Z_INDEX_LAYER_SIZE = 10;
export const SPRITE_SHEET_SRC = '/ciabattas-revenge-sprites.png';

export const PLACEMENT_TYPE_HERO = 'HERO';
export const PLACEMENT_TYPE_GOAL = 'GOAL';
export const PLACEMENT_TYPE_WALL = 'PLACEMENT_TYPE_WALL';
export const PLACEMENT_TYPE_FLOUR = 'FLOUR';
export const PLACEMENT_TYPE_CELEBRATION = 'CELEBRATION';
export const PLACEMENT_TYPE_LOCK_GREEN = 'LOCK_GREEN';
export const PLACEMENT_TYPE_LOCK_BLUE = 'LOCK_BLUE';
export const PLACEMENT_TYPE_KEY_GREEN = 'KEY_GREEN';
export const PLACEMENT_TYPE_KEY_BLUE = 'KEY_BLUE';
export const PLACEMENT_TYPE_WATER = 'WATER';
export const PLACEMENT_TYPE_FIRE = 'FIRE';
export const PLACEMENT_TYPE_ICE = 'ICE';
export const PLACEMENT_TYPE_CONVEYOR = 'CONVEYOR';
export const PLACEMENT_TYPE_TELEPORT = 'TELEPORT';
export const PLACEMENT_TYPE_THIEF = 'THIEF';
export const PLACEMENT_TYPE_WATER_PICKUP = 'WATER_PICKUP';
export const PLACEMENT_TYPE_FIRE_PICKUP = 'FIRE_PICKUP';
export const PLACEMENT_TYPE_ICE_PICKUP = 'ICE_PICKUP';
export const PLACEMENT_TYPE_GROUND_ENEMY = 'GROUND_ENEMY';
export const PLACEMENT_TYPE_FLYING_ENEMY = 'FLYING_ENEMY';
export const PLACEMENT_TYPE_ROAMING_ENEMY = 'ROAMING_ENEMY';
export const PLACEMENT_TYPE_CIABATTA = 'CIABATTA';
export const PLACEMENT_TYPE_SWITCH_DOOR = 'SWITCH_DOOR';
export const PLACEMENT_TYPE_SWITCH = 'SWITCH';

export const DIRECTION_LEFT = 'LEFT';
export const DIRECTION_RIGHT = 'RIGHT';
export const DIRECTION_UP = 'UP';
export const DIRECTION_DOWN = 'DOWN';

export type FourDirections =
  | typeof DIRECTION_DOWN
  | typeof DIRECTION_UP
  | typeof DIRECTION_LEFT
  | typeof DIRECTION_RIGHT;

export const DEATH_TYPE_CLOCK = 'CLOCK';

export const directionUpdateMap = {
  [DIRECTION_LEFT]: { x: -1, y: 0 },
  [DIRECTION_RIGHT]: { x: 1, y: 0 },
  [DIRECTION_UP]: { x: 0, y: -1 },
  [DIRECTION_DOWN]: { x: 0, y: 1 },
} as const;

export const BODY_SKINS = {
  NORMAL: 'NORMAL',
  WATER: 'WATER',
  ICE: 'ICE',
  CONVEYOR: 'CONVEYOR',
  FIRE: 'FIRE',
  TELEPORT: 'TELEPORT',
  DEATH: 'DEATH',
  SCARED: 'SCARED',
} as const;

export const HERO_RUN_1 = 'HERO_RUN_1';
export const HERO_RUN_2 = 'HERO_RUN_2';

export const heroSkinMap = {
  [BODY_SKINS.NORMAL]: [TILES.HERO_LEFT, TILES.HERO_RIGHT],
  [BODY_SKINS.WATER]: [TILES.HERO_WATER_LEFT, TILES.HERO_WATER_RIGHT],
  [BODY_SKINS.FIRE]: [TILES.HERO_FIRE_LEFT, TILES.HERO_FIRE_RIGHT],
  [BODY_SKINS.DEATH]: [TILES.HERO_DEATH_LEFT, TILES.HERO_DEATH_RIGHT],
  [BODY_SKINS.SCARED]: [TILES.HERO_DEATH_LEFT, TILES.HERO_DEATH_RIGHT],
  [BODY_SKINS.ICE]: [TILES.HERO_ICE_LEFT, TILES.HERO_ICE_RIGHT],
  [BODY_SKINS.CONVEYOR]: [TILES.HERO_CONVEYOR_LEFT, TILES.HERO_CONVEYOR_RIGHT],
  [BODY_SKINS.TELEPORT]: [TILES.HERO_TELEPORT_LEFT, TILES.HERO_TELEPORT_RIGHT],
  [HERO_RUN_1]: [TILES.HERO_RUN_1_LEFT, TILES.HERO_RUN_1_RIGHT],
  [HERO_RUN_2]: [TILES.HERO_RUN_2_LEFT, TILES.HERO_RUN_2_RIGHT],
} as const;

export type Skin = keyof typeof heroSkinMap;

export const LEVEL_THEMES = {
  YELLOW: 'YELLOW',
  BLUE: 'BLUE',
  GREEN: 'GREEN',
  PINK: 'PINK',
  GRAY: 'GRAY',
} as const;

export type LevelTheme = keyof typeof LEVEL_THEMES;

export const THEME_BACKGROUNDS = {
  [LEVEL_THEMES.YELLOW]: '#2f2808',
  [LEVEL_THEMES.BLUE]: '#3d4c67',
  [LEVEL_THEMES.GREEN]: '#2f2808',
  [LEVEL_THEMES.PINK]: '#673d5e',
  [LEVEL_THEMES.GRAY]: '#96a1c7',
} as const;

export const THEME_TILES_MAP = {
  [LEVEL_THEMES.YELLOW]: {
    FLOOR: [1, 1],
    TOP: [1, 0],
    LEFT: [0, 1],
    RIGHT: [2, 1],
    BOTTOM: [1, 2],
    WALL: [0, 2],
  },
  [LEVEL_THEMES.BLUE]: {
    FLOOR: [4, 1],
    TOP: [4, 0],
    LEFT: [3, 1],
    RIGHT: [5, 1],
    BOTTOM: [4, 2],
    WALL: [3, 2],
  },
  [LEVEL_THEMES.GREEN]: {
    FLOOR: [7, 1],
    TOP: [7, 0],
    LEFT: [6, 1],
    RIGHT: [8, 1],
    BOTTOM: [7, 2],
    WALL: [6, 2],
  },
  [LEVEL_THEMES.PINK]: {
    FLOOR: [10, 1],
    TOP: [10, 0],
    LEFT: [9, 1],
    RIGHT: [11, 1],
    BOTTOM: [10, 2],
    WALL: [9, 2],
  },
  [LEVEL_THEMES.GRAY]: {
    FLOOR: [13, 1],
    TOP: [13, 0],
    LEFT: [12, 1],
    RIGHT: [14, 1],
    BOTTOM: [13, 2],
    WALL: [12, 2],
  },
} as const;

export type ThemeTiles = (typeof THEME_TILES_MAP)[keyof typeof THEME_TILES_MAP];

export const ICE_CORNERS = {
  TOP_LEFT: 'TOP_LEFT',
  TOP_RIGHT: 'TOP_RIGHT',
  BOTTOM_LEFT: 'BOTTOM_LEFT',
  BOTTOM_RIGHT: 'BOTTOM_RIGHT',
};
