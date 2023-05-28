export const CELL_SIZE = 16;
export const Z_INDEX_LAYER_SIZE = 10;
export const SPRITE_SHEET_SRC = '/ciabattas-revenge-sprites.png';

export const PLACEMENT_TYPE_HERO = 'HERO';
export const PLACEMENT_TYPE_GOAL = 'GOAL';
export const PLACEMENT_TYPE_WALL = 'WALL';
export const PLACEMENT_TYPE_FLOUR = 'FLOUR';
export const PLACEMENT_TYPE_CELEBRATION = 'CELEBRATION';
export const PLACEMENT_TYPE_LOCK = 'LOCK';
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

export const DEATH_TYPE_CLOCK = 'CLOCK';

export const directionUpdateMap = {
  [DIRECTION_LEFT]: { x: -1, y: 0 },
  [DIRECTION_RIGHT]: { x: 1, y: 0 },
  [DIRECTION_UP]: { x: 0, y: -1 },
  [DIRECTION_DOWN]: { x: 0, y: 1 },
};

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

export const LOCK_KEY_COLORS = {
  BLUE: 'BLUE',
  GREEN: 'GREEN',
};

export const LEVEL_THEMES = {
  YELLOW: 'YELLOW',
  BLUE: 'BLUE',
  GREEN: 'GREEN',
  PINK: 'PINK',
  GRAY: 'GRAY',
};

export const THEME_BACKGROUNDS = {
  [LEVEL_THEMES.YELLOW]: '#2f2808',
  [LEVEL_THEMES.BLUE]: '#3d4c67',
  [LEVEL_THEMES.GREEN]: '#2f2808',
  [LEVEL_THEMES.PINK]: '#673d5e',
  [LEVEL_THEMES.GRAY]: '#96a1c7',
};

export const THEME_TILES_MAP = {
  [LEVEL_THEMES.YELLOW]: {
    FLOOR: '1x1',
    TOP: '1x0',
    LEFT: '0x1',
    RIGHT: '2x1',
    BOTTOM: '1x2',
    WALL: '0x2',
  },
  [LEVEL_THEMES.BLUE]: {
    FLOOR: '4x1',
    TOP: '4x0',
    LEFT: '3x1',
    RIGHT: '5x1',
    BOTTOM: '4x2',
    WALL: '3x2',
  },
  [LEVEL_THEMES.GREEN]: {
    FLOOR: '7x1',
    TOP: '7x0',
    LEFT: '6x1',
    RIGHT: '8x1',
    BOTTOM: '7x2',
    WALL: '6x2',
  },
  [LEVEL_THEMES.PINK]: {
    FLOOR: '10x1',
    TOP: '10x0',
    LEFT: '9x1',
    RIGHT: '11x1',
    BOTTOM: '10x2',
    WALL: '9x2',
  },
  [LEVEL_THEMES.GRAY]: {
    FLOOR: '13x1',
    TOP: '13x0',
    LEFT: '12x1',
    RIGHT: '14x1',
    BOTTOM: '13x2',
    WALL: '12x2',
  },
};

export const ICE_CORNERS = {
  TOP_LEFT: 'TOP_LEFT',
  TOP_RIGHT: 'TOP_RIGHT',
  BOTTOM_LEFT: 'BOTTOM_LEFT',
  BOTTOM_RIGHT: 'BOTTOM_RIGHT',
};
