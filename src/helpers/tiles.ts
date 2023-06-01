export const TILES = {
  // Basics
  SHADOW: [1, 3],
  FLOUR: [2, 3],
  FIRE_PICKUP: [3, 3],
  ICE_PICKUP: [4, 3],
  WATER_PICKUP: [5, 3],
  BULLET_PICKUP: [4, 9],
  BULLET: [3, 9],

  // Icons
  CONTINUE_BUTTON: [7, 3],
  EDIT_BUTTON: [8, 3],
  RESUME_BUTTON: [9, 3],
  RESTART_BUTTON: [10, 3],
  MAP_BUTTON: [11, 3],
  CLOCK: [12, 3],
  SETTINGS: [13, 3],

  // Locks and Keys
  BLUE_LOCK: [0, 4],
  BLUE_KEY: [1, 4],
  GREEN_LOCK: [2, 4],
  GREEN_KEY: [3, 4],
  UNLOCKED_LOCK: [4, 4],

  // Water
  WATER1: [0, 5],
  WATER2: [1, 5],

  // Ice
  ICE: [0, 6],
  ICE_TOP_LEFT: [1, 6],
  ICE_TOP_RIGHT: [2, 6],
  ICE_BOTTOM_LEFT: [3, 6],
  ICE_BOTTOM_RIGHT: [4, 6],

  // Fire
  FIRE1: [0, 7],
  FIRE2: [1, 7],
  FIRE3: [2, 7],

  // Conveyors
  CONVEYOR_DOWN: [0, 8],
  CONVEYOR_UP: [1, 8],
  CONVEYOR_RIGHT: [2, 8],
  CONVEYOR_LEFT: [3, 8],

  // Other Tiles
  BULLET_DROPBOX: [2, 9],

  // Spawns
  ENEMY_LEFT_SPAWN: [4, 8],
  ENEMY_RIGHT_SPAWN: [5, 8],
  ENEMY_UP_SPAWN: [6, 8],
  ENEMY_DOWN_SPAWN: [7, 8],
  ENEMY_FLYING_LEFT_SPAWN: [8, 8],
  ENEMY_FLYING_RIGHT_SPAWN: [9, 8],
  ENEMY_FLYING_UP_SPAWN: [10, 8],
  ENEMY_FLYING_DOWN_SPAWN: [11, 8],
  ENEMY_ROAMING_SPAWN: [12, 8],
  HERO_SPAWN: [13, 8],
  CIABATTA_SPAWN: [14, 8],

  //Goal
  GOAL_DISABLED: [0, 9],
  GOAL_ENABLED: [1, 9],

  //Switches, Other
  PURPLE_BUTTON: [0, 10],
  PURPLE_DOOR_OUTLINE: [1, 10],
  PURPLE_DOOR_SOLID: [2, 10],
  TELEPORT1: [3, 10],
  TELEPORT2: [4, 10],
  TELEPORT3: [5, 10],
  TELEPORT4: [6, 10],

  THIEF: [7, 10],
  WARNING: [8, 10],

  //Particle Dusty e, plosion
  PARTICLE_1: [5, 9],
  PARTICLE_2: [6, 9],
  PARTICLE_3: [7, 9],
  PARTICLE_4: [8, 9],
  PARTICLE_5: [9, 9],
  PARTICLE_6: [10, 9],
  PARTICLE_7: [11, 9],
  PARTICLE_8: [12, 9],
  PARTICLE_9: [13, 9],

  //Characters
  HERO_LEFT: [0, 12],
  HERO_RIGHT: [2, 12],
  ENEMY_LEFT: [4, 12],
  ENEMY_RIGHT: [6, 12],
  ENEMY_ROAMING: [8, 12],
  ENEMY_FLYING_LEFT: [10, 12],
  ENEMY_FLYING_RIGHT: [12, 12],
  HERO_HOP_LEFT: [14, 12],
  HERO_HOP_RIGHT: [16, 12],

  //Characters Row 2
  HERO_WATER_LEFT: [0, 14],
  HERO_WATER_RIGHT: [2, 14],
  HERO_ICE_LEFT: [4, 14],
  HERO_ICE_RIGHT: [6, 14],
  HERO_CONVEYOR_LEFT: [8, 14],
  HERO_CONVEYOR_RIGHT: [10, 14],
  HERO_FIRE_LEFT: [12, 14],
  HERO_FIRE_RIGHT: [14, 14],

  //Characters Row 3
  HERO_DEATH_LEFT: [0, 16],
  HERO_DEATH_RIGHT: [2, 16],
  HERO_TELEPORT_LEFT: [4, 16],
  HERO_TELEPORT_RIGHT: [6, 16],
  HERO_EDITING_LEFT: [8, 16],
  HERO_EDITING_RIGHT: [10, 16],

  //Characters Row 4
  HERO_RUN_1_LEFT: [0, 18],
  HERO_RUN_1_RIGHT: [2, 18],
  HERO_RUN_2_LEFT: [4, 18],
  HERO_RUN_2_RIGHT: [6, 18],

  // Ciabatta
  CIABATTA1: [5, 4],
  CIABATTA2: [8, 4],
  CIABATTA_PAIN: [11, 4],
  CIABATTA_DEAD: [14, 4],
  CIABATTA_RIGHT: [17, 4],
  CIABATTA_TELEPORT: [20, 4],
  CIABATTA_BLAST: [6, 3],
} as const;

export type Tile = (typeof TILES)[keyof typeof TILES];
