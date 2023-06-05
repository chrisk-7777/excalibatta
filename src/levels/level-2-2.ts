import {
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_GROUND_ENEMY,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_SWITCH,
  PLACEMENT_TYPE_SWITCH_DOOR,
  PLACEMENT_TYPE_WALL,
} from '../helpers/consts';

export const Level_2_2 = {
  theme: 'GREEN',
  timeAvailable: 99,
  tilesWidth: 9,
  tilesHeight: 7,
  placements: [
    {
      type: PLACEMENT_TYPE_HERO,
      x: 2,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_GOAL,
      x: 8,
      y: 6,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 4,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 4,
      y: 4,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 6,
      y: 6,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 6,
      y: 4,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 4,
      y: 1,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 4,
      y: 5,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 4,
      y: 7,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 6,
      y: 7,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 6,
      y: 1,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 6,
      y: 3,
    },
    {
      type: PLACEMENT_TYPE_GROUND_ENEMY,
      x: 5,
      y: 6,
      direction: 'UP',
    },
    {
      type: PLACEMENT_TYPE_FLOUR,
      x: 5,
      y: 1,
    },
    {
      type: PLACEMENT_TYPE_FLOUR,
      x: 5,
      y: 7,
    },
    {
      type: PLACEMENT_TYPE_SWITCH_DOOR,
      x: 5,
      y: 4,
      isRaised: false,
    },
    {
      type: PLACEMENT_TYPE_SWITCH,
      x: 2,
      y: 6,
    },
    {
      type: PLACEMENT_TYPE_SWITCH,
      x: 8,
      y: 2,
    },
  ],
};
