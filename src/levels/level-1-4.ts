import {
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_SWITCH,
  PLACEMENT_TYPE_SWITCH_DOOR,
  PLACEMENT_TYPE_WALL,
} from '../helpers/consts';

export const Level_1_4 = {
  theme: 'BLUE',
  timeAvailable: 99,
  tilesWidth: 12,
  tilesHeight: 3,
  placements: [
    {
      type: PLACEMENT_TYPE_HERO,
      x: 2,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_GOAL,
      x: 11,
      y: 2,
    },
    {
      type: 'SWITCH_WALL',
      x: 9,
      y: 2,
      isRaised: true,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 8,
      y: 1,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 8,
      y: 3,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 4,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 5,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 6,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_FLOUR,
      x: 5,
      y: 3,
    },
    {
      type: PLACEMENT_TYPE_SWITCH_DOOR,
      x: 6,
      y: 3,
      isRaised: false,
    },
    {
      type: PLACEMENT_TYPE_SWITCH,
      x: 4,
      y: 3,
    },
  ],
};
