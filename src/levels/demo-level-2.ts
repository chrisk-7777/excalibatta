import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  LEVEL_THEMES,
  PLACEMENT_TYPE_CONVEYOR,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
} from '../helpers/consts';

const level = {
  theme: LEVEL_THEMES.YELLOW,
  timeAvailable: 55,
  tilesWidth: 8,
  tilesHeight: 5,
  placements: [
    { x: 1, y: 1, type: PLACEMENT_TYPE_HERO },
    { x: 7, y: 5, type: PLACEMENT_TYPE_GOAL },
    { x: 4, y: 4, type: PLACEMENT_TYPE_WALL },
    { x: 3, y: 2, type: PLACEMENT_TYPE_FLOUR },
    { x: 6, y: 4, type: PLACEMENT_TYPE_FLOUR },

    { x: 1, y: 4, type: PLACEMENT_TYPE_CONVEYOR, direction: DIRECTION_DOWN },
    { x: 1, y: 5, type: PLACEMENT_TYPE_CONVEYOR, direction: DIRECTION_RIGHT },
    { x: 2, y: 5, type: PLACEMENT_TYPE_CONVEYOR, direction: DIRECTION_RIGHT },
    { x: 3, y: 5, type: PLACEMENT_TYPE_CONVEYOR, direction: DIRECTION_UP },
    { x: 3, y: 4, type: PLACEMENT_TYPE_CONVEYOR, direction: DIRECTION_UP },
    { x: 3, y: 3, type: PLACEMENT_TYPE_CONVEYOR, direction: DIRECTION_RIGHT },
    { x: 4, y: 3, type: PLACEMENT_TYPE_CONVEYOR, direction: DIRECTION_RIGHT },
    { x: 5, y: 3, type: PLACEMENT_TYPE_CONVEYOR, direction: DIRECTION_UP },
    { x: 5, y: 2, type: PLACEMENT_TYPE_CONVEYOR, direction: DIRECTION_LEFT },
    { x: 4, y: 2, type: PLACEMENT_TYPE_CONVEYOR, direction: DIRECTION_LEFT },
  ],
};

export default level;
