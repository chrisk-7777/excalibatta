import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
  PLACEMENT_TYPE_LOCK_GREEN,
  PLACEMENT_TYPE_KEY_GREEN,
  PLACEMENT_TYPE_ICE,
  PLACEMENT_TYPE_WATER,
  PLACEMENT_TYPE_FIRE,
  PLACEMENT_TYPE_CONVEYOR,
  PLACEMENT_TYPE_WATER_PICKUP,
  PLACEMENT_TYPE_ICE_PICKUP,
  PLACEMENT_TYPE_GROUND_ENEMY,
  PLACEMENT_TYPE_FIRE_PICKUP,
  PLACEMENT_TYPE_SWITCH_DOOR,
  PLACEMENT_TYPE_SWITCH,
  PLACEMENT_TYPE_TELEPORT,
  PLACEMENT_TYPE_LOCK_BLUE,
  PLACEMENT_TYPE_KEY_BLUE,
  PLACEMENT_TYPE_FLYING_ENEMY,
  PLACEMENT_TYPE_ROAMING_ENEMY,
  PLACEMENT_TYPE_THIEF,
  //PLACEMENT_TYPE_CIABATTA,
} from '../helpers/consts';

const level = {
  theme: LEVEL_THEMES.GREEN,
  timeAvailable: 99,
  tilesWidth: 20,
  tilesHeight: 8,
  placements: [
    { x: 6, y: 5, type: PLACEMENT_TYPE_HERO },
    { x: 7, y: 4, type: PLACEMENT_TYPE_GOAL },

    //{ x: 3, y: 1, type: PLACEMENT_TYPE_CIABATTA },
    { x: 5, y: 1, type: PLACEMENT_TYPE_FIRE },

    { x: 3, y: 2, type: PLACEMENT_TYPE_TELEPORT },
    { x: 7, y: 6, type: PLACEMENT_TYPE_TELEPORT },

    { x: 4, y: 3, type: PLACEMENT_TYPE_SWITCH_DOOR, isRaised: true },
    { x: 5, y: 3, type: PLACEMENT_TYPE_SWITCH_DOOR, isRaised: false },
    { x: 6, y: 3, type: PLACEMENT_TYPE_SWITCH_DOOR, isRaised: true },
    { x: 7, y: 3, type: PLACEMENT_TYPE_SWITCH_DOOR, isRaised: false },
    { x: 8, y: 3, type: PLACEMENT_TYPE_SWITCH_DOOR, isRaised: true },
    { x: 9, y: 3, type: PLACEMENT_TYPE_SWITCH_DOOR, isRaised: false },
    { x: 10, y: 3, type: PLACEMENT_TYPE_SWITCH_DOOR, isRaised: true },
    { x: 11, y: 3, type: PLACEMENT_TYPE_SWITCH_DOOR, isRaised: false },
    { x: 12, y: 3, type: PLACEMENT_TYPE_SWITCH_DOOR, isRaised: true },
    { x: 4, y: 2, type: PLACEMENT_TYPE_SWITCH },

    { x: 8, y: 2, type: PLACEMENT_TYPE_WALL },
    { x: 8, y: 4, type: PLACEMENT_TYPE_FLOUR },

    { x: 1, y: 4, type: PLACEMENT_TYPE_CONVEYOR, direction: 'DOWN' },
    { x: 1, y: 5, type: PLACEMENT_TYPE_CONVEYOR, direction: 'DOWN' },

    { x: 3, y: 4, type: PLACEMENT_TYPE_FIRE },
    { x: 4, y: 4, type: PLACEMENT_TYPE_FIRE_PICKUP },
    { x: 5, y: 4, type: PLACEMENT_TYPE_FIRE },

    { x: 7, y: 1, type: PLACEMENT_TYPE_ICE },
    { x: 8, y: 1, type: PLACEMENT_TYPE_ICE },
    { x: 9, y: 1, type: PLACEMENT_TYPE_ICE },
    { x: 10, y: 1, type: PLACEMENT_TYPE_ICE },
    { x: 11, y: 1, type: PLACEMENT_TYPE_ICE },
    { x: 12, y: 1, type: PLACEMENT_TYPE_ICE },
    { x: 13, y: 1, type: PLACEMENT_TYPE_ICE },
    { x: 14, y: 1, type: PLACEMENT_TYPE_ICE },

    { x: 1, y: 8, type: PLACEMENT_TYPE_ICE_PICKUP },

    // Row 1
    { x: 3, y: 6, type: PLACEMENT_TYPE_ICE, corner: 'TOP_LEFT' },
    { x: 4, y: 6, type: PLACEMENT_TYPE_ICE },
    { x: 5, y: 6, type: PLACEMENT_TYPE_ICE, corner: 'TOP_RIGHT' },

    // Row 2
    { x: 3, y: 7, type: PLACEMENT_TYPE_ICE },
    { x: 4, y: 7, type: PLACEMENT_TYPE_ICE },
    { x: 5, y: 7, type: PLACEMENT_TYPE_ICE },

    // Row 3
    { x: 2, y: 8, type: PLACEMENT_TYPE_ICE, corner: 'BOTTOM_LEFT' },
    { x: 3, y: 8, type: PLACEMENT_TYPE_ICE },
    { x: 4, y: 8, type: PLACEMENT_TYPE_ICE },
    { x: 5, y: 8, type: PLACEMENT_TYPE_ICE, corner: 'BOTTOM_RIGHT' },

    { x: 6, y: 8, type: PLACEMENT_TYPE_WATER_PICKUP },
    { x: 7, y: 8, type: PLACEMENT_TYPE_WATER },

    { x: 10, y: 6, type: PLACEMENT_TYPE_GROUND_ENEMY },
    { x: 10, y: 8, type: PLACEMENT_TYPE_FLYING_ENEMY },
    { x: 19, y: 8, type: PLACEMENT_TYPE_ROAMING_ENEMY },

    { x: 20, y: 1, type: PLACEMENT_TYPE_KEY_GREEN },

    { x: 13, y: 5, type: PLACEMENT_TYPE_LOCK_GREEN },
    { x: 13, y: 6, type: PLACEMENT_TYPE_LOCK_GREEN },

    { x: 15, y: 5, type: PLACEMENT_TYPE_KEY_BLUE },

    { x: 19, y: 1, type: PLACEMENT_TYPE_LOCK_BLUE },
    { x: 19, y: 2, type: PLACEMENT_TYPE_LOCK_BLUE },
    { x: 20, y: 2, type: PLACEMENT_TYPE_LOCK_BLUE },

    { x: 18, y: 5, type: PLACEMENT_TYPE_THIEF },
  ],
};

export default level;
