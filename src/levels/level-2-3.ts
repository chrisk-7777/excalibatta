import {
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_GROUND_ENEMY,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
} from '../helpers/consts';
import { LevelData } from './levels-map';

export const Level_2_3: LevelData = {
  theme: 'GREEN',
  timeAvailable: 99,
  tilesWidth: 9,
  tilesHeight: 9,
  placements: [
    {
      type: PLACEMENT_TYPE_HERO,
      x: 5,
      y: 5,
    },
    {
      type: PLACEMENT_TYPE_GOAL,
      x: 8,
      y: 8,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 6,
      y: 4,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 4,
      y: 6,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 4,
      y: 4,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 2,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 8,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 6,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 4,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 2,
      y: 4,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 8,
      y: 4,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 2,
      y: 6,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 8,
      y: 6,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 2,
      y: 8,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 4,
      y: 8,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 6,
      y: 8,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 6,
      y: 6,
    },
    {
      type: PLACEMENT_TYPE_GROUND_ENEMY,
      x: 7,
      y: 6,
      direction: 'UP',
    },
    {
      type: PLACEMENT_TYPE_GROUND_ENEMY,
      x: 3,
      y: 4,
      direction: 'DOWN',
    },
    {
      type: PLACEMENT_TYPE_GROUND_ENEMY,
      x: 6,
      y: 7,
      direction: 'LEFT',
    },
    {
      type: PLACEMENT_TYPE_GROUND_ENEMY,
      x: 4,
      y: 3,
      direction: 'RIGHT',
    },
    {
      type: PLACEMENT_TYPE_FLOUR,
      x: 3,
      y: 7,
    },
    {
      type: PLACEMENT_TYPE_FLOUR,
      x: 3,
      y: 3,
    },
    {
      type: PLACEMENT_TYPE_FLOUR,
      x: 7,
      y: 3,
    },
    {
      type: PLACEMENT_TYPE_FLOUR,
      x: 7,
      y: 7,
    },
  ],
};
