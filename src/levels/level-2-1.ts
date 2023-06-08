import {
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_KEY_BLUE,
  PLACEMENT_TYPE_KEY_GREEN,
  PLACEMENT_TYPE_LOCK_BLUE,
  PLACEMENT_TYPE_LOCK_GREEN,
  PLACEMENT_TYPE_THIEF,
  PLACEMENT_TYPE_WALL,
} from '../helpers/consts';
import { LevelData } from './levels-map';

export const Level_2_1: LevelData = {
  theme: 'GREEN',
  timeAvailable: 99,
  tilesWidth: 9,
  tilesHeight: 5,
  placements: [
    {
      type: PLACEMENT_TYPE_HERO,
      x: 2,
      y: 4,
    },
    {
      type: PLACEMENT_TYPE_GOAL,
      x: 5,
      y: 5,
    },
    {
      type: PLACEMENT_TYPE_KEY_GREEN,
      x: 4,
      y: 1,
    },
    {
      type: PLACEMENT_TYPE_KEY_BLUE,
      x: 1,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_THIEF,
      x: 6,
      y: 1,
    },
    {
      type: PLACEMENT_TYPE_FLOUR,
      x: 9,
      y: 1,
    },
    // Walls
    {
      type: PLACEMENT_TYPE_WALL,
      x: 2,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_LOCK_BLUE,
      x: 3,
      y: 1,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 3,
      y: 2,
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
      type: PLACEMENT_TYPE_LOCK_GREEN,
      x: 8,
      y: 1,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 7,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_WALL,
      x: 8,
      y: 2,
    },
    {
      type: PLACEMENT_TYPE_LOCK_GREEN,
      x: 9,
      y: 2,
    },
  ],
};
