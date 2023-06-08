import { PLACEMENT_TYPE_FLOUR, PLACEMENT_TYPE_GOAL, PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_WALL } from '../helpers/consts';
import { LevelData } from './levels-map';

export const Level_1_2: LevelData = {
  theme: 'BLUE',
  timeAvailable: 99,
  tilesWidth: 9,
  tilesHeight: 3,
  placements: [
    {
      type: PLACEMENT_TYPE_HERO,
      x: 2,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_GOAL,
      x: 8,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 5,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_FLOUR,
      x: 6,
      y: 3,
    },
    {
      type: PLACEMENT_TYPE_FLOUR,
      x: 4,
      y: 1,
    },
  ],
};
